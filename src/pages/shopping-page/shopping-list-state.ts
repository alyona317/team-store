import { aggregateIngredients } from '../../shopping-list/aggregate-ingredients';
import type { Menu, Recipe } from '../../types';

/** Формирует список из ингредиентов меню и хранит изменения до перезагрузки страницы. */
export function createShoppingListState(menu: Menu, recipes: Recipe[]) {
  const items = new Map(
    aggregateIngredients(menu, recipes).map((item) => [item.key, item]),
  );
  const recipeIds = new Set(recipes.map(({ id }) => id));
  const recipeCount = Object.values(menu.slots)
    .flat()
    .filter((id) => recipeIds.has(id)).length;
  let nextCustomId = 0;

  return {
    recipeCount,
    /** Возвращает текущие позиции в порядке добавления. */
    get items() {
      return Array.from(items.values());
    },
    /** Считает купленные позиции и те, которые ещё нужно купить. */
    get summary() {
      const purchased = Array.from(items.values()).filter(
        (item) => item.checked,
      ).length;
      return {
        remaining: items.size - purchased,
        purchased,
      };
    },
    /** Добавляет ручную позицию и возвращает false, если название или количество не прошли проверку. */
    addCustomItem(name: string, quantity: number | null, unit: string | null) {
      const trimmedName = name.trim();
      if (
        !trimmedName ||
        (quantity !== null && (!Number.isFinite(quantity) || quantity <= 0))
      ) {
        return false;
      }

      const key = `custom-${nextCustomId++}`;
      items.set(key, {
        key,
        name: trimmedName,
        quantity,
        unit: unit?.trim() || null,
        source: 'custom',
        checked: false,
      });
      return true;
    },
    /** Меняет отметку о покупке у позиции с указанным ключом. */
    setChecked(key: string, checked: boolean) {
      const item = items.get(key);
      if (item) {
        item.checked = checked;
      }
    },
    /** Удаляет одну позицию по ключу. */
    removeItem(key: string) {
      items.delete(key);
    },
    /** Удаляет все позиции, отмеченные как купленные. */
    clearPurchased() {
      for (const [key, item] of items) {
        if (item.checked) {
          items.delete(key);
        }
      }
    },
  };
}
