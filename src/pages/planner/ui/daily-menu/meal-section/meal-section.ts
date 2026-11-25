import addIcon from '../../../../../assets/svg/add.svg?raw';

import { createButtonWithIcon } from '../../../../../components';
import { BaseComponent } from '../../../../../core';
import { MEAL_SLOT_LABELS } from '../../../../../model/labels.ts';
import type { MealSlot, Recipe } from '../../../../../model/types.ts';
import { createSvgElement } from '../../../../../utils';

import { renderMenuItem } from '../menu-item';

import './meal-section.css';

export function renderMealSection(slotName: MealSlot, recipes: Recipe[]) {
  const slotContainer = new BaseComponent({
    className: ['meal-section'],
  });

  const slotHeader = new BaseComponent({
    className: ['meal-section__header', 'menu-rectangle'],
    text: MEAL_SLOT_LABELS[slotName],
  });

  const slotList = new BaseComponent({
    tag: 'ul',
    className: ['meal-section__list', 'menu-rectangle'],
  });

  for (const recipe of recipes) {
    slotList.append(renderMenuItem(recipe));
  }

  const slotButton = createButtonWithIcon({
    text: 'Добавить блюдо',
    icon: createSvgElement(addIcon),
    className: ['meal-section__button', 'menu-rectangle'],
  });

  slotContainer.append(slotHeader, slotList, slotButton);

  return slotContainer;
}
