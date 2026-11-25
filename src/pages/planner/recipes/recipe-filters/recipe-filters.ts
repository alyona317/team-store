import { BaseComponent } from '../../../../core';
import {
  FILTER_CATEGORIES,
  FILTER_CATEGORY_LABELS,
} from '../../../../model/labels.ts';

import './recipe-filters.css';

export function renderRecipeFiltersSection(): BaseComponent {
  const filtersContainer = new BaseComponent({
    className: ['filters-section', 'menu-rectangle'],
    text: 'Фильтры по рецептам',
  });

  const filters = new BaseComponent({
    className: ['filters-container'],
  });

  for (const category of FILTER_CATEGORIES) {
    filters.append(
      new BaseComponent({
        tag: 'button',
        className: ['filter-chip'],
        text: FILTER_CATEGORY_LABELS[category],
      }),
    );
  }

  const searchField = new BaseComponent({
    tag: 'input',
    className: ['filters-search', 'menu-rectangle'],
  });

  filtersContainer.append(searchField, filters);

  return filtersContainer;
}
