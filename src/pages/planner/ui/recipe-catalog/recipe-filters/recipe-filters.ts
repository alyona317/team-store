import { BaseComponent } from '../../../../../core';
import {
  FILTER_CATEGORIES,
  FILTER_CATEGORY_LABELS,
} from '../../../../../model/labels.ts';

import { renderSearchField } from '../search-field';

import './recipe-filters.css';

export function renderRecipeFiltersSection(): BaseComponent {
  const filtersContainer = new BaseComponent({
    className: ['recipe-filters'],
  });

  const filters = new BaseComponent({
    className: ['recipe-filters__list'],
  });

  for (const category of FILTER_CATEGORIES) {
    filters.append(
      new BaseComponent({
        tag: 'button',
        className: ['recipe-filters__chip'],
        text: FILTER_CATEGORY_LABELS[category],
      }),
    );
  }

  filtersContainer.append(
    renderSearchField({
      placeholder: 'Найти рецепт...',
      label: 'Найти рецепт',
    }),
    filters,
  );

  return filtersContainer;
}
