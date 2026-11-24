import { BaseComponent } from '../../../../core';

export function renderRecipeFiltersSection(): BaseComponent {
  return new BaseComponent({
    className: ['recipe-filters-section', 'menu-rectangle'],
    text: 'Фильтры по рецептам',
  });
}
