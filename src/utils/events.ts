/**
 * Внутренний type guard для проверки, является ли `EventTarget`
 * экземпляром указанного DOM-класса.
 *
 * Используется в {@link checkEventTargetElement}, чтобы TypeScript
 * сузил тип после проверки.
 *
 * @template T - конструктор DOM-элемента (например, `HTMLButtonElement`)
 * @param type - конструктор, с которым сравнивается элемент
 * @param element - проверяемое значение (обычно `event.target`)
 *
 * @returns `true`, если `element` — экземпляр `type`
 */
function isElementOfType<T extends typeof Element>(
  type: T,
  element: EventTarget | null,
): element is InstanceType<T> {
  return element !== null && element instanceof type;
}

/**
 * Проверяет, что `event.target` (или любой `EventTarget`) является
 * элементом указанного типа, и возвращает его с суженным типом.
 *
 * Типичный сценарий — обработчики событий, где `event.target` имеет
 * тип `EventTarget | null`, но по логике должен быть конкретным
 * элементом (`HTMLInputElement`, `HTMLButtonElement` и т.п.).
 *
 * @template T - конструктор DOM-элемента (например, `HTMLInputElement`)
 * @param type - ожидаемый конструктор элемента
 * @param element - проверяемое значение (обычно `event.target`)
 *
 * @returns тот же элемент с суженным типом `InstanceType<T>`
 * @throws {Error} если `element` равен `null` или не является экземпляром `type`
 */
export function checkEventTargetElement<T extends typeof Element>(
  type: T,
  element: EventTarget | null,
): InstanceType<T> {
  if (!isElementOfType(type, element)) {
    throw new Error(`Required event element of type ${type.name} not found.`);
  }
  return element;
}
