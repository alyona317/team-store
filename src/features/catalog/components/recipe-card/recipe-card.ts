import { BaseComponent } from '../../../../core';

export function renderRecipeCardSection(): BaseComponent {
  return new BaseComponent({
    className: ['recipe-card-section', 'menu-rectangle'],
    text: 'Сетка рецептов',
  });
}
