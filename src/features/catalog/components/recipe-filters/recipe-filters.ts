import { BaseComponent } from '../../../../core';
import { DISH_CATEGORIES } from '../../../../types.ts';
import { DISH_CATEGORY_LABELS } from '../../../../constants.ts';

import './recipe-filters.css';

export function renderRecipeFiltersSection(): BaseComponent {
  const filtersContainer = new BaseComponent({
    className: ['filters-section', 'menu-rectangle'],
    text: 'Фильтры по рецептам',
  });

  const filters = new BaseComponent({
    className: ['filters-container'],
  });

  for (const category of DISH_CATEGORIES) {
    filters.append(
      new BaseComponent({
        tag: 'button',
        className: ['filter-chip'],
        text: DISH_CATEGORY_LABELS[category],
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
