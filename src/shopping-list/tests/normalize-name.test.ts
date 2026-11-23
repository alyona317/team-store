import { describe, it, expect } from 'vitest';
import { normalizeName } from '../normalize-name.js';

describe('normalizeName', () => {
  it('удаляет пробелы в начале и в конце строки', () => {
    expect(normalizeName('  hello world  ')).toBe('hello world');
  });

  it('приводит строку к нижнему регистру', () => {
    expect(normalizeName('HeLLo WoRLD')).toBe('hello world');
  });

  it("заменяет букву 'ё' на 'е'", () => {
    expect(normalizeName('ёлка')).toBe('елка');
  });

  it('заменяет несколько пробелов на один', () => {
    expect(normalizeName('hello   world')).toBe('hello world');
  });

  it('комбинирует все правила', () => {
    expect(normalizeName('  Ёлка   и   МЁд  ')).toBe('елка и мед');
  });
});
