import { BaseComponent } from '../../core';
import type { Menu, Recipe } from '../../model/types';
import { createPurchasedSection } from './purchased';
import { createShoppingRow } from './shopping-row';
import { createToBuySection } from './to-buy';
import { createToBuyAddingSection } from './to-buy-adding';
import { createShoppingListState } from './shopping-list-state';
import './shopping-page.css';

/** Собирает страницу покупок и связывает её элементы с состоянием списка. */
export function renderShoppingPage(
  menu: Menu,
  recipes: Recipe[],
): BaseComponent {
  const state = createShoppingListState(menu, recipes);

  const page = new BaseComponent({ className: ['shopping-page'] });
  const toolbar = new BaseComponent({ className: ['shopping-toolbar'] });
  const title = new BaseComponent({ tag: 'h1', text: 'Список покупок' });
  const clearButton = new BaseComponent({
    tag: 'button',
    text: 'Очистить купленное',
    attrs: { type: 'button' },
  });
  const summary = new BaseComponent({
    tag: 'p',
    className: ['shopping-summary'],
    attrs: { 'aria-live': 'polite' },
  });
  const buy = createToBuySection();
  const custom = createToBuyAddingSection((name, quantity, unit) => {
    if (!state.addCustomItem(name, quantity, unit)) return false;
    renderItems();
    return true;
  });
  const purchased = createPurchasedSection();

  toolbar.append(title, clearButton);
  page.append(toolbar, summary, buy.section, custom.section, purchased.section);

  /** Распределяет позиции по секциям, обновляет счётчики и возвращает фокус на перемещённый чекбокс. */
  function renderItems(focusKey?: string) {
    buy.list.clear();
    custom.list.clear();
    purchased.list.clear();

    let menuItems = 0;
    for (const item of state.items) {
      const { row, checkbox } = createShoppingRow(
        item,
        (checked) => {
          state.setChecked(item.key, checked);
          renderItems(item.key);
        },
        () => {
          state.removeItem(item.key);
          renderItems();
        },
      );
      if (item.checked) {
        purchased.list.append(row);
      } else if (item.source === 'custom') {
        custom.list.append(row);
      } else {
        buy.list.append(row);
        menuItems++;
      }

      if (item.key === focusKey) checkbox.element.focus();
    }

    const { remaining, purchased: purchasedCount } = state.summary;
    summary.setText(
      `Рецептов в меню: ${state.recipeCount} · Осталось купить: ${remaining}`,
    );
    buy.heading.setText(`Купить (${menuItems})`);
    purchased.heading.setText(`Куплено (${purchasedCount})`);
    clearButton.element.disabled = purchasedCount === 0;
    buy.empty.element.hidden = menuItems > 0;
  }

  clearButton.addEventListener('click', () => {
    state.clearPurchased();
    renderItems();
  });

  renderItems();
  return page;
}
