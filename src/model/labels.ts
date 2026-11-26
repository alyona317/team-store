import {
  ALL_CATEGORY,
  DISH_CATEGORIES,
  type DishCategory,
  type FilterCategory,
  type MealSlot,
} from './types.ts';

export const MEAL_SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

export const isMealSlot = (key: string): key is MealSlot =>
  Object.hasOwn(MEAL_SLOT_LABELS, key);

export const DISH_CATEGORY_LABELS: Record<DishCategory, string> = {
  salad: 'Салаты',
  first: 'Первые блюда',
  main: 'Основные блюда',
  snack: 'Закуски',
  dessert: 'Десерты',
  drink: 'Напитки',
};

export const FILTER_CATEGORY_LABELS: Record<FilterCategory, string> = {
  [ALL_CATEGORY]: 'Все',
  ...DISH_CATEGORY_LABELS,
  first: 'Первое',
  main: 'Второе',
};

export const FILTER_CATEGORIES: readonly FilterCategory[] = [
  ALL_CATEGORY,
  ...DISH_CATEGORIES,
];
