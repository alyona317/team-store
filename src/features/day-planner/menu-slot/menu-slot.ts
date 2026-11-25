import { BaseComponent } from '../../../core';
import type { MealSlot, Recipe } from '../../../types.ts';
import { MEAL_SLOT_LABELS } from '../../../constants.ts';

import './menu-slot.css';

export function menuSlotSection(slotName: MealSlot, recipes: Recipe[]) {
  const slotContainer = new BaseComponent({
    className: ['slot-container'],
  });

  const slotHeader = new BaseComponent({
    className: ['slot-header', 'menu-rectangle'],
    text: MEAL_SLOT_LABELS[slotName],
  });

  const slotList = new BaseComponent({
    tag: 'ul',
    className: ['slot-list', 'menu-rectangle'],
    text: 'Список блюд',
  });

  for (const recipe of recipes) {
    const listItem = new BaseComponent({
      tag: 'li',
      className: ['slot-list-item', 'menu-rectangle'],
      text: recipe.title,
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
