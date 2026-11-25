import { BaseComponent } from '../../../core';
import { MOCK_RECIPES } from '../../../mocks';

import './menu-slot.css';

const recipesById = new Map(MOCK_RECIPES.map((recipe) => [recipe.id, recipe]));

export function menuSlotSection(slotName: string, recipeList: string[]) {
  const slotContainer = new BaseComponent({
    className: ['slot-container'],
  });

  const slotHeader = new BaseComponent({
    className: ['slot-header', 'menu-rectangle'],
    text: slotName,
  });

  const slotList = new BaseComponent({
    tag: 'ul',
    className: ['slot-list', 'menu-rectangle'],
    text: 'Список блюд',
  });

  for (const recipeId of recipeList) {
    const recipe = recipesById.get(recipeId);

    const listItem = new BaseComponent({
      tag: 'li',
      className: ['slot-list-item', 'menu-rectangle'],
      text: recipe?.title ?? recipeId,
    });

    slotList.append(listItem);
  }

  const slotButton = new BaseComponent({
    tag: 'button',
    className: ['slot-button', 'menu-rectangle'],
    text: 'Добавить блюдо',
  });

  slotContainer.append(slotHeader, slotList, slotButton);

  return slotContainer;
}
