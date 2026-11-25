import basketIcon from '../../../assets/svg/basket.svg?raw';

import { BaseComponent } from '../../../core';
import { MOCK_RECIPES } from '../../../data';
import { isMealSlot } from '../../../model/labels.ts';
import type { Menu, Recipe } from '../../../model/types.ts';
import { createSvgElement } from '../../../utils';
import { createButtonWithIcon } from '../../../components';

import { renderMealSlot } from './meal-slot';

import './daily-menu-section.css';

export function renderDailyMenuSection(dayMenu: Menu): BaseComponent {
  const dailyMenuContainer = new BaseComponent({
    className: ['daily-menu', 'menu-rectangle'],
  });

  const dailyMenuHeader = new BaseComponent({
    className: ['daily-menu__header', 'menu-rectangle'],
    text: 'Моё меню на день',
  });

  const shoppingListButton = createButtonWithIcon({
    text: 'Сформировать список покупок',
    icon: createSvgElement(basketIcon),
    className: ['daily-menu__button', 'menu-rectangle'],
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
    dailyMenuContainer.append(renderMealSlot(slotKey, recipes));
  }

  dailyMenuContainer.append(shoppingListButton);

  return dailyMenuContainer;
}
