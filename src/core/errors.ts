import type { ErrorHandler } from './types.ts';

/** Заглушка-обработчик ошибок: молча игнорирует их. */
export const noopErrorHandler: ErrorHandler = () => {};

/**
 * Обработчик ошибок для dev-режима: логирует в консоль.
 * Удобно использовать в dev-окружении для отладки приложения,
 * чтобы не терять ошибки в слушателях.
 */
export const logErrorHandler: ErrorHandler = (error, context) => {
  console.error(`[${context}]`, error);
};
