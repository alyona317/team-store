import { BaseComponent } from '../../../../core';
import { MOCK_RECIPES } from '../../../../data';
import { isMealSlot } from '../../../../model/labels.ts';
import type { Menu, Recipe } from '../../../../model/types.ts';

import { renderShoppingListButton } from '../shopping-list-button';
import { renderMealSection } from './meal-section';

import './daily-menu.css';

export function renderDailyMenu(dayMenu: Menu): BaseComponent {
  const dailyMenuContainer = new BaseComponent({
    className: ['daily-menu', 'menu-rectangle'],
  });

  const dailyMenuHeader = new BaseComponent({
    className: ['daily-menu__header', 'menu-rectangle'],
    text: 'Моё меню на день',
  });

  dailyMenuContainer.append(dailyMenuHeader);

  const recipesById = new Map(
    MOCK_RECIPES.map((recipe) => [recipe.id, recipe]),
  );

  for (const [slotKey, ids] of Object.entries(dayMenu.slots)) {
    const recipes = ids
      .map((id) => recipesById.get(id))
      .filter((recipe): recipe is Recipe => recipe !== undefined);

    if (!isMealSlot(slotKey)) continue;
    dailyMenuContainer.append(renderMealSection(slotKey, recipes));
  }

  dailyMenuContainer.append(renderShoppingListButton());

  return dailyMenuContainer;
}
