import { describe, expect, it } from 'vitest';
import { makeItemKey } from '../make-item-key';

describe('makeItemKey', () => {
  it('создает ключ для элемента с единицей измерения', () => {
    const key = makeItemKey('Молоко', 'л');
    expect(key).toBe('молоко::л');
  });

  it('создает ключ для элемента без единицы измерения', () => {
    const key = makeItemKey('Хлеб', null);
    expect(key).toBe('хлеб::');
  });

  it('нормализует имя элемента', () => {
    const key = makeItemKey('  Ёлка   ', 'шт');
    expect(key).toBe('елка::шт');
  });
});
