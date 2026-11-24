import type { Menu } from '../types.ts';

/** Пустое меню — для проверки EmptyMenu и пустых слотов. */
export const MOCK_MENU_EMPTY: Menu = {
  slots: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  },
};

/**
 * Заполненное меню. Все recipeId существуют в MOCK_RECIPES.
 * Кейсы:
 *  - lunch содержит ДВА рецепта (Борщ + Салат) — слот = массив;
 *  - recipe-6, recipe-7 намеренно не в меню (остаются в каталоге);
 *  - при агрегации дадут мерж «Куриное яйцо» 2+2+3=7 шт и
 *    «Сыр пармезан»/«сыр Пармезан» 50+100=150 г.
 */
export const MOCK_MENU_FILLED: Menu = {
  slots: {
    breakfast: ['recipe-5'],
    lunch: ['recipe-2', 'recipe-1'],
    dinner: ['recipe-3'],
    snack: ['recipe-4'],
  },
};
