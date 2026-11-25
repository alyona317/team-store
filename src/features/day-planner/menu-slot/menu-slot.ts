import { BaseComponent } from '../../../core';

import './menu-slot.css';

export function menuSlotSection() {
  const slotContainer = new BaseComponent({
    className: ['slot-container'],
  });

  const slotHeader = new BaseComponent({
    className: ['slot-header', 'menu-rectangle'],
    text: 'Блок меню',
  });

  const slotList = new BaseComponent({
    className: ['slot-list', 'menu-rectangle'],
    text: 'Список блюд',
  });

  const slotButton = new BaseComponent({
    tag: 'button',
    className: ['slot-button', 'menu-rectangle'],
    text: 'Добавить блюдо',
  });

  slotContainer.append(slotHeader, slotList, slotButton);

  return slotContainer;
}
