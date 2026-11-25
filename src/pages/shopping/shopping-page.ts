import { aggregateIngredients } from '../../model/shopping-list/aggregate-ingredients';
import type { Menu, Recipe } from '../../model/types';

export function renderShoppingPage(menu: Menu, recipes: Recipe[]): string {
  const items = aggregateIngredients(menu, recipes);
  const heading = '<h1>Корзина</h1>';

  if (items.length === 0) {
    return `${heading}<p>В списке покупок пока нет ингредиентов.</p>`;
  }

  const list = document.createElement('ul');
  const formatQuantity = new Intl.NumberFormat('ru-RU');

  for (const { name, quantity, unit } of items) {
    const row = document.createElement('li');
    const amount =
      quantity === null
        ? 'по вкусу'
        : [formatQuantity.format(quantity), unit].filter(Boolean).join(' ');
    row.textContent = `${name} — ${amount}`;
    list.append(row);
  }

  return heading + list.outerHTML;
}
