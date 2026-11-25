import basketIcon from '../../../../assets/svg/basket.svg?raw';

import { createButtonWithIcon } from '../../../../components';
import { BaseComponent } from '../../../../core';
import { createSvgElement } from '../../../../utils';

export function renderShoppingListButton(): BaseComponent<'button'> {
  return createButtonWithIcon({
    text: 'Сформировать список покупок',
    icon: createSvgElement(basketIcon),
    className: ['daily-menu__button', 'menu-rectangle'],
  });
}
