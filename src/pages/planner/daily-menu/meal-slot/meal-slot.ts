import addIcon from '../../../../assets/svg/add.svg?raw';
import closeIcon from '../../../../assets/svg/close.svg?raw';

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
  });

  for (const recipe of recipes) {
    const listItem = new BaseComponent({
      tag: 'li',
      className: ['meal-slot__item'],
    });

    const dish = new BaseComponent({
      className: ['meal-slot__dish'],
    });

    const marker = new BaseComponent({
      tag: 'span',
      className: ['meal-slot__marker'],
      attrs: { 'aria-hidden': 'true' },
    });

    const title = new BaseComponent({
      tag: 'span',
      className: ['meal-slot__title'],
      text: recipe.title,
    });

    const removeButton = new BaseComponent({
      tag: 'button',
      className: ['meal-slot__remove'],
      attrs: {
        type: 'button',
        'aria-label': `Удалить ${recipe.title}`,
      },
    });
    removeButton.element.append(createSvgElement(closeIcon));

    dish.append(marker, title);
    listItem.append(dish, removeButton);
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
