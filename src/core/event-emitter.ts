import type { ErrorHandler } from './types.ts';
import { noopErrorHandler } from './errors.ts';

/**
 * Функция-обработчик события.
 * @template T - тип передаваемого значения
 */
type Listener<T> = (value: T) => void;

/**
 * Реализация паттерна Наблюдатель (Observer).
 *
 * Хранит подписчиков в `Set`, что обеспечивает O(1) отписку и
 * невозможность дублирования одного и того же слушателя.
 * `emit` работает по снапшоту коллекции, поэтому подписка/отписка
 * внутри обработчика не ломает итерацию.
 *
 * @template T - тип передаваемого значения
 */
export class EventEmitter<T> {
  /**
   * Коллекция подписчиков на события.
   * `Set` выбран вместо массива ради O(1) отписки и защиты от дубликатов.
   */
  private listeners: Set<Listener<T>> = new Set();

  /**
   * @param onError - обработчик ошибок слушателей.
   * По умолчанию ошибки молча игнорируются; передайте свой, чтобы логировать их.
   */
  constructor(private readonly onError: ErrorHandler = noopErrorHandler) {}

  /**
   * Отправляет событие всем подписчикам.
   *
   * Итерируется по снапшоту коллекции: если слушатель подпишется или
   * отпишется во время `emit`, это не повлияет на текущую рассылку.
   * Ошибка в одном слушателе не прерывает рассылку остальным —
   * она передаётся в {@link ErrorHandler}.
   *
   * @param value - значение для передачи подписчикам
   */
  public emit(value: T): void {
    const snapshot = [...this.listeners];
    for (const listener of snapshot) {
      try {
        listener(value);
      } catch (error) {
        this.onError(error, 'EventEmitter.emit');
      }
    }
  }

  /**
   * Подписывает обработчик на события.
   *
   * @param listener - функция-обработчик
   * @returns функция для отписки; идемпотентна (повторный вызов — no-op)
   */
  public subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Возвращает текущее количество подписчиков.
   * @returns число активных подписок
   */
  public getListenerCount(): number {
    return this.listeners.size;
  }

  /**
   * Удаляет всех подписчиков.
   * Полезно при разрушении владельца эмиттера, чтобы не утекали ссылки.
   */
  public clear(): void {
    this.listeners.clear();
  }
}
