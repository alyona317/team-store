import { BaseComponent } from '../../../core';

import './menu-slot.css';

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

  for (const recipe of recipeList) {
    const listItem = new BaseComponent({
      tag: 'li',
      className: ['slot-list-item', 'menu-rectangle'],
      text: recipe,
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
