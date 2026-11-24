import { BaseComponent } from '../../core';

export function renderCatalogSection(): BaseComponent {
  return new BaseComponent({
    className: ['catalog-section', 'menu-rectangle'],
    text: 'Каталог рецептов',
  });
}
