import fireIcon from '../../../../assets/svg/fire.svg?raw';
import timerIcon from '../../../../assets/svg/timer.svg?raw';

import { BaseComponent } from '../../../../core';
import type { Recipe } from '../../../../model/types.ts';
import { createSvgElement } from '../../../../utils';

import './recipe-card.css';

function renderInfoItem(icon: string, text: string): BaseComponent {
  const item = new BaseComponent({
    className: ['recipe-card__info-item'],
  });

  const iconSlot = new BaseComponent({
    tag: 'span',
    className: ['recipe-card__icon'],
  });
  iconSlot.element.append(createSvgElement(icon));

  const label = new BaseComponent({
    tag: 'span',
    text,
  });

  item.append(iconSlot, label);
  return item;
}

export function renderRecipeCardSection(recipes: Recipe[]): BaseComponent {
  const recipeContainer = new BaseComponent({
    className: ['recipe-list', 'menu-rectangle'],
  });

  for (const recipe of recipes) {
    const recipeCard = new BaseComponent({
      className: ['recipe-card'],
      attrs: { 'data-recipe-id': recipe.id },
      text: recipe.title,
    });

    const infoContainer = new BaseComponent({
      className: ['recipe-card__info'],
    });

    if (recipe.calories !== undefined) {
      infoContainer.append(
        renderInfoItem(fireIcon, String(recipe.calories) + ' ккал'),
      );
    }

    infoContainer.append(
      renderInfoItem(timerIcon, recipe.cookingTime + ' мин'),
    );

    recipeCard.append(infoContainer);

    recipeContainer.append(recipeCard);
  }

  return recipeContainer;
}
