import { BaseComponent } from '../../core';
import {
  renderRecipeCardSection,
  renderRecipeFiltersSection,
} from './components';

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
    renderRecipeCardSection(),
  );

  return catalogContainer;
}
