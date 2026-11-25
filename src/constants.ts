import type { MealSlot } from './types';

export const MEAL_SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

export const isMealSlot = (key: string): key is MealSlot =>
  Object.hasOwn(MEAL_SLOT_LABELS, key);
