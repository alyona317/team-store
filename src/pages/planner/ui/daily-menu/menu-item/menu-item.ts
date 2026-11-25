import closeIcon from '../../../../../assets/svg/close.svg?raw';

import { BaseComponent } from '../../../../../core';
import type { Recipe } from '../../../../../model/types.ts';
import { createSvgElement } from '../../../../../utils';

import './menu-item.css';

export function renderMenuItem(recipe: Recipe) {
  const listItem = new BaseComponent({
    tag: 'li',
    className: ['menu-item'],
  });

  const dish = new BaseComponent({
    className: ['menu-item__dish'],
  });

  const marker = new BaseComponent({
    tag: 'span',
    className: ['menu-item__marker'],
    attrs: { 'aria-hidden': 'true' },
  });

  const title = new BaseComponent({
    tag: 'span',
    className: ['menu-item__title'],
    text: recipe.title,
  });

  const removeButton = new BaseComponent({
    tag: 'button',
    className: ['menu-item__remove'],
    attrs: {
      type: 'button',
      'aria-label': `Удалить ${recipe.title}`,
    },
  });
  removeButton.element.append(createSvgElement(closeIcon));

  dish.append(marker, title);
  listItem.append(dish, removeButton);

  return listItem;
}
