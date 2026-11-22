import type { Menu, Recipe, ShoppingItem } from '../types';
import { makeItemKey } from './make-item-key';

export const aggregateIngredients = (
  menu: Menu,
  recipes: Recipe[],
): ShoppingItem[] => {
  const shoppingMap = new Map<string, ShoppingItem>();
  const recipeIds = Object.values(menu.slots).flat();

  if (!recipeIds.length) {
    return [];
  }

  for (const recipeId of recipeIds) {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) continue;
    recipe.ingredients.forEach((ingredient) => {
      const key = makeItemKey(ingredient.name, ingredient.unit);
      if (shoppingMap.has(key)) {
        const existingItem = shoppingMap.get(key)!;
        existingItem.quantity =
          existingItem.quantity === null || ingredient.quantity === null
            ? null
            : existingItem.quantity + ingredient.quantity;
      } else {
        shoppingMap.set(key, {
          key,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          source: 'menu',
          checked: false,
        });
      }
    });
  }

  return Array.from(shoppingMap.values());
};
