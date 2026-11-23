import type { Subscribable } from './types.ts';

/**
 * Тип для допустимых HTML-тегов (ключи HTMLElementTagNameMap).
 * Ограничивает параметр `T` только тегами, для которых в lib.dom
 * есть соответствующий интерфейс элемента.
 */
export type Tags = keyof HTMLElementTagNameMap;

/**
 * Конфигурационные свойства для компонента.
 *
 * @template T - тип HTML-тега
 */
export type ComponentProps<T extends Tags> = {
  /** Тег создаваемого элемента; по умолчанию — 'div' */
  tag?: T;
  /** CSS-классы, которые нужно добавить элементу */
  className?: string[];
  /** Текстовое содержимое элемента; пустая строка — валидное значение */
  text?: string;
  /**
   * HTML-атрибуты элемента.
   * `boolean`: `true` → атрибут присутствует (пустое значение),
   * `false` → атрибут удаляется.
   */
  attrs?: Record<string, string | boolean>;
  /** Inline-стили элемента */
  styles?: Record<string, string>;
};

/**
 * Базовый компонент для создания DOM-элементов.
 *
 * Управляет жизненным циклом: хранит дочерние компоненты, слушатели событий
 * и подписки на Observable, снимая всё это в {@link destroy}.
 *
 * @template T - тип HTML-тега (по умолчанию 'div')
 */
export class BaseComponent<T extends Tags = 'div'> {
  /**
   * DOM-элемент компонента.
   * Типизирован в соответствии с указанным тегом.
   */
  public readonly element: HTMLElementTagNameMap[T];

  /**
   * Дочерние компоненты.
   * Нужны для рекурсивного `destroy` и `clear`.
   */
  private children: BaseComponent<Tags>[] = [];

  /**
   * Функции отписки от DOM-событий.
   * `Set` обеспечивает идемпотентность и удаление за O(1).
   */
  private listeners = new Set<() => void>();

  /**
   * Функции отписки от Observable.
   */
  private subscriptions = new Set<() => void>();

  /** Защита от повторного `destroy`. */
  private destroyed = false;

  /**
   * Создает новый компонент.
   *
   * @param props - конфигурационные свойства для создания элемента
   */
  constructor(props: ComponentProps<T> = {}) {
    this.element = document.createElement(
      props.tag ?? 'div',
    ) as HTMLElementTagNameMap[T];

    if (props.className?.length) {
      this.element.classList.add(...props.className);
    }

    if (props.text !== undefined) {
      this.element.textContent = props.text;
    }

    if (props.attrs) {
      for (const [key, value] of Object.entries(props.attrs)) {
        if (typeof value === 'boolean') {
          if (value) this.element.setAttribute(key, '');
          else this.element.removeAttribute(key);
        } else {
          this.element.setAttribute(key, value);
        }
      }
    }

    if (props.styles) {
      Object.assign(this.element.style, props.styles);
    }
  }

  /**
   * Устанавливает текстовое содержимое элемента.
   * В отличие от конструктора, доступно после создания компонента.
   *
   * @param text - новый текст
   * @returns this для цепочки вызовов
   */
  public setText(text: string): this {
    this.element.textContent = text;
    return this;
  }

  /**
   * Очищает все дочерние компоненты.
   *
   * Вызывает `destroy()` у каждого ребёнка (рекурсивно снимает слушатели
   * и подписки), а не просто `remove()` — иначе были бы утечки.
   *
   * @returns this для цепочки вызовов
   */
  public clear(): this {
    for (const child of this.children) {
      child.destroy();
    }
    this.children = [];
    return this;
  }

  /**
   * Добавляет дочерние компоненты в конец элемента.
   *
   * @param components - компоненты для добавления
   * @returns this для цепочки вызовов
   */
  public append(...components: BaseComponent<Tags>[]): this {
    for (const component of components) {
      this.element.append(component.element);
      this.children.push(component);
    }
    return this;
  }

  /**
   * Добавляет обработчик события к элементу.
   *
   * Слушатель автоматически снимается в {@link destroy}.
   * Для ручной отписки используйте {@link on}.
   *
   * @template K - тип события
   * @param event - тип события
   * @param handler - обработчик события
   * @param options - опции добавления обработчика
   * @returns this для цепочки вызовов
   */
  public addEventListener<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): this {
    this.bindListener(event, handler, options);
    return this;
  }

  /**
   * Добавляет обработчик события и возвращает функцию отписки.
   *
   * В отличие от {@link addEventListener} не участвует в chainable API,
   * но позволяет отписаться вручную до `destroy`.
   *
   * @template K - тип события
   * @param event - тип события
   * @param handler - обработчик события
   * @param options - опции добавления обработчика
   * @returns функция для отписки; идемпотентна
   */
  public on<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): () => void {
    return this.bindListener(event, handler, options);
  }

  /**
   * Подписывается на источник значений (например, {@link Observable})
   * с автоотпиской в {@link destroy}.
   *
   * @template TValue - тип значения источника
   * @param observable - любой объект с методом `subscribe`
   * @param listener - функция-обработчик
   * @returns this для цепочки вызовов
   */
  public subscribe<TValue>(
    observable: Subscribable<TValue>,
    listener: (value: TValue) => void,
  ): this {
    this.subscriptions.add(observable.subscribe(listener));
    return this;
  }

  /**
   * Показывает элемент (убирает `display: none`).
   * @returns this для цепочки вызовов
   */
  public show(): this {
    this.element.style.display = '';
    return this;
  }

  /**
   * Скрывает элемент (устанавливает `display: none`).
   * @returns this для цепочки вызовов
   */
  public hide(): this {
    this.element.style.display = 'none';
    return this;
  }

  /**
   * Убирает элемент из DOM.
   *
   * Слушатели и подписки при этом **не** снимаются — для полной
   * очистки используйте {@link destroy}.
   */
  public remove(): void {
    this.element.remove();
  }

  /**
   * Полностью уничтожает компонент.
   *
   * Рекурсивно уничтожает детей, снимает все DOM-слушатели и подписки
   * на Observable, удаляет элемент из DOM. Идемпотентен: повторный вызов
   * ничего не делает.
   */
  public destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;

    for (const child of this.children) {
      child.destroy();
    }
    this.children = [];

    for (const removeListener of [...this.listeners]) {
      removeListener();
    }
    this.listeners.clear();

    for (const unsubscribe of [...this.subscriptions]) {
      unsubscribe();
    }
    this.subscriptions.clear();

    this.element.remove();
  }

  /**
   * Внутренний хелпер: навешивает DOM-слушатель и регистрирует его
   * для последующей очистки в {@link destroy}.
   *
   * @template K - тип события
   * @param event - тип события
   * @param handler - обработчик события
   * @param options - опции добавления обработчика
   * @returns идемпотентная функция отписки
   */
  private bindListener<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): () => void {
    const listener = handler as EventListener;
    this.element.addEventListener(event, listener, options);

    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      this.element.removeEventListener(event, listener, options);
      this.listeners.delete(remove);
    };

    this.listeners.add(remove);
    return remove;
  }
}
