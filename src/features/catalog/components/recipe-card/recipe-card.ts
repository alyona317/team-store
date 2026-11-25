import { BaseComponent } from '../../../../core';
import type { Recipe } from '../../../../types.ts';

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
    recipeContainer.append(recipeCard);
  }

  return recipeContainer;
}
