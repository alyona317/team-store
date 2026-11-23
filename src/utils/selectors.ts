//
// ==================== Функции поиска элементов ====================
//

/**
 * Тип контейнера, внутри которого можно искать элементы.
 *
 * Покрывает все стандартные корни поиска: `document` (глобальный поиск),
 * `DocumentFragment` (поиск внутри фрагмента) и `HTMLElement`
 * (поиск внутри поддерева компонента).
 *
 * Используется как тип параметра `parent` во всех функциях этого модуля.
 */
export type Queryable = Document | DocumentFragment | HTMLElement;

/**
 * Внутренний type guard: проверяет, что `element` является экземпляром
 * класса, переданного конструктором `type`.
 *
 * В отличие от `instanceof` напрямую, сужает тип элемента до `T`,
 * что позволяет функциям модуля возвращать типизированный результат.
 *
 * @template T - ожидаемый тип элемента
 * @param element - проверяемый DOM-элемент
 * @param type - конструктор ожидаемого типа (например, `HTMLInputElement`)
 *
 * @returns `true`, если `element` — экземпляр `type`
 */
function isElementOfType<T extends Element>(
  element: Element,
  type: new () => T,
): element is T {
  return element instanceof type;
}

/**
 * Находит первый подходящий элемент по CSS-селектору и проверяет его тип.
 *
 * Бросает исключение, если элемент не найден или если найденный элемент
 * не соответствует ожидаемому типу. Это предпочтительнее «голого»
 * `querySelector`, потому что:
 * - исключение сразу сигнализирует о проблеме в разметке;
 * - возвращаемый тип сужен до `T`, не нужно писать `as` и проверки.
 *
 * @template T - ожидаемый тип элемента
 * @param type - конструктор ожидаемого типа (например, `HTMLButtonElement`)
 * @param selector - CSS-селектор
 * @param parent - корень поиска (по умолчанию `document`)
 *
 * @returns найденный элемент с типом `T`
 * @throws {Error} если элемент не найден
 * @throws {Error} если найденный элемент имеет другой тип
 */
export function getElementWithType<T extends Element>(
  type: new () => T,
  selector: string,
  parent: Queryable = document,
): T {
  const element = parent.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: "${selector}"`);
  }

  if (!isElementOfType(element, type)) {
    throw new Error(
      `Element "${selector}" is not ${type.name}. Found: ${element.constructor.name}`,
    );
  }

  return element;
}

/**
 * Находит первый элемент по CSS-селектору и возвращает его,
 * только если он соответствует ожидаемому типу.
 *
 * Non-throwing вариант {@link getElementWithType}: возвращает `null`,
 * если элемент не найден или имеет другой тип. Удобен для
 * «опциональных» элементов и ветвлений без `try/catch`.
 *
 * @template T - ожидаемый тип элемента
 * @param type - конструктор ожидаемого типа
 * @param selector - CSS-селектор
 * @param parent - корень поиска (по умолчанию `document`)
 *
 * @returns найденный элемент с типом `T` или `null`
 */
export function findElementWithType<T extends Element>(
  type: new () => T,
  selector: string,
  parent: Queryable = document,
): T | null {
  const element = parent.querySelector(selector);
  return element && element instanceof type ? element : null;
}

/**
 * Находит все элементы по CSS-селектору и проверяет тип каждого.
 *
 * Если хотя бы один элемент не соответствует ожидаемому типу, бросает
 * исключение — это гарантирует, что вызывающий код работает с
 * однородной коллекцией. Пустой результат — валидный случай
 * (возвращается пустой массив).
 *
 * @template T - ожидаемый тип элементов
 * @param type - конструктор ожидаемого типа
 * @param selector - CSS-селектор
 * @param parent - корень поиска (по умолчанию `document`)
 *
 * @returns массив найденных элементов с типом `T`
 * @throws {Error} если хотя бы один элемент имеет другой тип
 */
export function getAllElementsWithType<T extends Element>(
  type: new () => T,
  selector: string,
  parent: Queryable = document,
): T[] {
  const elements = Array.from(parent.querySelectorAll(selector));

  return elements.map((element, index) => {
    if (!isElementOfType(element, type)) {
      throw new Error(
        `Element at index ${index} with selector "${selector}" is not ${type.name}. ` +
          `Found: ${element.constructor.name}`,
      );
    }
    return element;
  });
}
