import threeLines from '../../../../../assets/images/three-lines.webp';
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
    className: ['meal-section__header'],
  });

  const slotTitle = new BaseComponent({
    tag: 'span',
    className: ['meal-section__title'],
    text: MEAL_SLOT_LABELS[slotName],
  });

  const slotMarks = new BaseComponent({
    tag: 'img',
    className: ['meal-section__marks'],
    attrs: {
      src: threeLines,
      alt: '',
      'aria-hidden': 'true',
    },
  });

  slotHeader.append(slotTitle, slotMarks);

  const slotList = new BaseComponent({
    tag: 'ul',
    className: ['meal-section__list'],
  });

  for (const recipe of recipes) {
    slotList.append(renderMenuItem(recipe));
  }

  const slotButton = createButtonWithIcon({
    text: 'Добавить блюдо',
    icon: createSvgElement(addIcon),
    className: ['meal-section__button'],
  });

  slotContainer.append(slotHeader, slotList, slotButton);

  return slotContainer;
}
