import type { DishCategory, MealSlot } from './types.ts';

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
