import { BaseComponent } from '../../../core';
import { MOCK_RECIPES } from '../../../data';

import { renderRecipeCardSection } from './recipe-card';
import { renderRecipeFiltersSection } from './recipe-filters';

import './recipes-section.css';

export function renderRecipesSection(): BaseComponent {
  const recipesContainer = new BaseComponent({
    className: ['recipes', 'menu-rectangle'],
  });

  const recipesHeader = new BaseComponent({
    className: ['recipes__header', 'menu-rectangle'],
    text: 'Каталог рецептов',
  });

  recipesContainer.append(
    recipesHeader,
    renderRecipeFiltersSection(),
    renderRecipeCardSection(MOCK_RECIPES),
  );

  return recipesContainer;
}
