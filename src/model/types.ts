export const DISH_CATEGORIES = [
  'salad',
  'first',
  'main',
  'snack',
  'dessert',
  'drink',
] as const;

export type DishCategory = (typeof DISH_CATEGORIES)[number];

export const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export type MealSlot = (typeof MEAL_SLOTS)[number];

export const ALL_CATEGORY = 'all' as const;

/** Что можно выбрать в фильтре: любая доменная категория или «все». */
export type FilterCategory = DishCategory | typeof ALL_CATEGORY;

// -----------------------------------------------------------------------------

export interface Ingredient {
  name: string;
  quantity: number | null; // null = «по вкусу»
  unit: string | null;
}

export interface Recipe {
  id: string;
  title: string;
  category: DishCategory;
  cookingTime: number; // минуты
  calories?: number;
  ingredients: Ingredient[];
  emoji?: string; // для карточки
}

export interface Menu {
  slots: Record<MealSlot, string[]>; // slot -> recipeIds (массив, т.к. обед = суп + второе)
}

export interface ShoppingItem {
  key: string; // нормализованное имя + единица
  name: string; // отображаемое имя
  quantity: number | null;
  unit: string | null;
  source: 'menu' | 'custom';
  checked: boolean;
}

export interface AppState {
  menu: Menu;
  customItems: ShoppingItem[];
  checkedKeys: Set<string>; // ключи отмеченных позиций из меню
  orphanedKeys: Set<string>; // позиции, пропавшие из меню, но не удалённые пользователем
}
