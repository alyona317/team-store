import { BaseComponent } from '../../../../core';
import { MOCK_RECIPES } from '../../../../data';

import { renderRecipeCardSection } from './recipe-card';
import { renderRecipeFiltersSection } from './recipe-filters';

import './recipe-catalog.css';

export function renderRecipeCatalog(): BaseComponent {
  const recipesContainer = new BaseComponent({
    className: ['recipe-catalog', 'menu-rectangle'],
  });

  const recipesHeader = new BaseComponent({
    className: ['recipe-catalog__header', 'menu-rectangle'],
    text: 'Каталог рецептов',
  });

  recipesContainer.append(
    recipesHeader,
    renderRecipeFiltersSection(),
    renderRecipeCardSection(MOCK_RECIPES),
  );

  return recipesContainer;
}
