import { EventEmitter } from './event-emitter';
import type { ErrorHandler } from './types.ts';
import { noopErrorHandler } from './errors.ts';

/**
 * Реактивное значение Observable, которое автоматически оповещает
 * подписчиков о своём изменении.
 *
 * Гарантии:
 * - подписчик сразу получает текущее значение при `subscribe`;
 * - `set` не эмитит, если значение не изменилось (`Object.is`);
 * - `map` создаёт производный Observable, лениво подписываясь на источник
 *   только при появлении первого подписчика и отписываясь при исчезновении последнего.
 *
 * @template T - тип хранимого значения
 */
export class Observable<T> {
  /**
   * Текущее значение Observable.
   */
  private currentValue: T;

  /**
   * Внутренний эмиттер, оповещающий подписчиков об изменениях.
   */
  private readonly emitter: EventEmitter<T>;

  /**
   * Обработчик ошибок, общий для эмиттера и производных Observable.
   * Доступен наследникам (например, {@link DerivedObservable}).
   */
  protected readonly onError: ErrorHandler;

  /**
   * Создает новое реактивное значение.
   *
   * @param initialValue - начальное значение
   * @param onError - обработчик ошибок слушателей и мапперов;
   * по умолчанию ошибки молча игнорируются
   */
  constructor(initialValue: T, onError?: ErrorHandler) {
    this.currentValue = initialValue;
    this.onError = onError ?? noopErrorHandler;
    this.emitter = new EventEmitter<T>(this.onError);
  }

  /**
   * Получает текущее значение.
   * @returns текущее значение
   */
  public get(): T {
    return this.currentValue;
  }

  /**
   * Устанавливает новое значение и оповещает подписчиков.
   *
   * Сравнение выполняется через `Object.is` — корректно для `NaN` и `-0`.
   * Если значение не изменилось, эмиссии не происходит.
   *
   * @param newValue - новое значение
   */
  public set(newValue: T): void {
    if (Object.is(this.currentValue, newValue)) return;
    this.currentValue = newValue;
    this.emitter.emit(newValue);
  }

  /**
   * Обновляет значение с помощью функции и оповещает подписчиков.
   *
   * @param updater - функция для преобразования текущего значения
   * @throws пробрасывает исключение из `updater`, если он его бросит
   */
  public update(updater: (current: T) => T): void {
    this.set(updater(this.currentValue));
  }

  /**
   * Подписывает обработчик на изменения значения.
   *
   * Подписка сначала регистрируется в эмиттере, а затем слушатель вызывается
   * с текущим значением. Это гарантирует, что даже если listener бросит
   * исключение на первом вызове, подписка не потеряется (ошибка уйдёт в
   * {@link ErrorHandler}).
   *
   * @param listener - функция-обработчик
   * @returns функция для отписки
   */
  public subscribe(listener: (value: T) => void): () => void {
    const unsubscribe = this.emitter.subscribe(listener);
    try {
      listener(this.currentValue);
    } catch (error) {
      this.onError(error, 'Observable.subscribe');
    }
    return unsubscribe;
  }

  /**
   * Возвращает текущее количество подписчиков.
   * @returns число активных подписок
   */
  public getListenerCount(): number {
    return this.emitter.getListenerCount();
  }

  /**
   * Создаёт производный Observable, значение которого вычисляется
   * из значения источника через {@link mapper}.
   *
   * Подписка на источник ленивая: осуществляется при появлении
   * первого подписчика на производный Observable и снимается при
   * исчезновении последнего.
   *
   * @template U - тип значения производного Observable
   * @param mapper - функция преобразования значения источника
   * @returns новый Observable, зависящий от текущего
   */
  public map<U>(mapper: (value: T) => U): Observable<U> {
    return new DerivedObservable(this, mapper, this.onError);
  }
}

/**
 * Производный Observable, созданный через {@link Observable.map}.
 *
 * Отвечает за ленивую подписку на источник: подписывается при появлении
 * первого подписчика и отписывается при исчезновении последнего.
 * Переопределяет `subscribe` - это поведение сохраняет
 * контракт класса и корректно работает при наследовании.
 *
 * @template T - тип значения источника
 * @template U - тип значения производного Observable
 */
class DerivedObservable<T, U> extends Observable<U> {
  /** Функция отписки от источника; `null`, когда подписки нет. */
  private sourceUnsub: (() => void) | null = null;

  /**
   * @param source - Observable-источник
   * @param mapper - функция преобразования значения источника в значение производного
   * @param onError - обработчик ошибок маппера и слушателей
   */
  constructor(
    private readonly source: Observable<T>,
    private readonly mapper: (value: T) => U,
    onError?: ErrorHandler,
  ) {
    super(mapper(source.get()), onError);
  }

  /**
   * Подписывает обработчик на изменения производного значения.
   *
   * При первом подписчике устанавливает подписку на источник;
   * при отписке последнего — снимает её, освобождая ресурсы.
   *
   * @param listener - функция-обработчик
   * @returns функция для отписки
   */
  public override subscribe(listener: (value: U) => void): () => void {
    // Ленивая подписка на источник — только когда есть хотя бы один подписчик
    if (this.getListenerCount() === 0 && !this.sourceUnsub) {
      this.sourceUnsub = this.source.subscribe((value) => {
        try {
          this.set(this.mapper(value));
        } catch (error) {
          this.onError(error, 'DerivedObservable.subscribe');
        }
      });
    }

    const unsubscribe = super.subscribe(listener);

    return () => {
      unsubscribe();

      if (this.getListenerCount() === 0) {
        this.sourceUnsub?.();
        this.sourceUnsub = null;
      }
    };
  }
}
