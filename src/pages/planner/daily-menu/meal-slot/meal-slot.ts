import addIcon from '../../../../assets/svg/add.svg?raw';

import { BaseComponent } from '../../../../core';
import { MEAL_SLOT_LABELS } from '../../../../model/labels.ts';
import type { MealSlot, Recipe } from '../../../../model/types.ts';
import { createSvgElement } from '../../../../utils';
import { createButtonWithIcon } from '../../../../components';

import './meal-slot.css';

export function renderMealSlot(slotName: MealSlot, recipes: Recipe[]) {
  const slotContainer = new BaseComponent({
    className: ['meal-slot'],
  });

  const slotHeader = new BaseComponent({
    className: ['meal-slot__header', 'menu-rectangle'],
    text: MEAL_SLOT_LABELS[slotName],
  });

  const slotList = new BaseComponent({
    tag: 'ul',
    className: ['meal-slot__list', 'menu-rectangle'],
    text: 'Список блюд',
  });

  for (const recipe of recipes) {
    const listItem = new BaseComponent({
      tag: 'li',
      className: ['meal-slot__item', 'menu-rectangle'],
      text: recipe.title,
    });
    slotList.append(listItem);
  }

  const slotButton = createButtonWithIcon({
    text: 'Добавить блюдо',
    icon: createSvgElement(addIcon),
    className: ['meal-slot__button', 'menu-rectangle'],
  });

  slotContainer.append(slotHeader, slotList, slotButton);

  return slotContainer;
}
