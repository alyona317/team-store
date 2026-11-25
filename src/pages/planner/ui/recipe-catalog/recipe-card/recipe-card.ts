import noImage from '../../../../../assets/recipes/no-image.webp';
import fireIcon from '../../../../../assets/svg/fire.svg?raw';
import timerIcon from '../../../../../assets/svg/timer.svg?raw';

import { BaseComponent } from '../../../../../core';
import type { Recipe } from '../../../../../model/types.ts';
import { renderInfoItem } from '../info-item';

import './recipe-card.css';

export function renderRecipeCardSection(recipes: Recipe[]): BaseComponent {
  const recipeContainer = new BaseComponent({
    className: ['recipe-list', 'menu-rectangle'],
  });

  for (const recipe of recipes) {
    const recipeCard = new BaseComponent({
      className: ['recipe-card'],
      attrs: { 'data-recipe-id': recipe.id },
    });

    const image = new BaseComponent({
      tag: 'img',
      className: ['recipe-card__image'],
      attrs: {
        src: recipe.image ?? noImage,
        alt: recipe.title,
      },
    });

    const title = new BaseComponent({
      tag: 'span',
      className: ['recipe-card__title'],
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

    recipeCard.append(image, title, infoContainer);

    recipeContainer.append(recipeCard);
  }

  return recipeContainer;
}
