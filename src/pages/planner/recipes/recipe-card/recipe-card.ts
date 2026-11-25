import { BaseComponent } from '../../../../core';
import type { Recipe } from '../../../../model/types.ts';

import './recipe-card.css';

export function renderRecipeCardSection(recipes: Recipe[]): BaseComponent {
  const recipeContainer = new BaseComponent({
    className: ['recipes-grid', 'menu-rectangle'],
  });

  for (const recipe of recipes) {
    const recipeCard = new BaseComponent({
      className: ['recipe-card'],
      attrs: { 'data-recipe-id': recipe.id },
      text: recipe.title,
    });

    const infoContainer = new BaseComponent({
      className: ['info-container'],
    });

    infoContainer.append(
      new BaseComponent({
        className: ['info-item'],
        text: 'Калории: ' + recipe.calories,
      }),
      new BaseComponent({
        className: ['info-item'],
        text: 'Время: ' + recipe.cookingTime + ' мин',
      }),
    );

    recipeCard.append(infoContainer);

    recipeContainer.append(recipeCard);
  }

  return recipeContainer;
}
