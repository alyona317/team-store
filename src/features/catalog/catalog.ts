import { BaseComponent } from '../../core';
import {
  renderRecipeCardSection,
  renderRecipeFiltersSection,
} from './components';
import { MOCK_RECIPES } from '../../mocks';

import './catalog.css';

export function renderCatalogSection(): BaseComponent {
  const catalogContainer = new BaseComponent({
    className: ['catalog-section', 'menu-rectangle'],
  });

  const catalogHeader = new BaseComponent({
    className: ['catalog-header', 'menu-rectangle'],
    text: 'Каталог рецептов',
  });

  catalogContainer.append(
    catalogHeader,
    renderRecipeFiltersSection(),
    renderRecipeCardSection(MOCK_RECIPES),
  );

  return catalogContainer;
}
