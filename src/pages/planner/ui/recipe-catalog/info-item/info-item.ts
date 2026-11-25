import { BaseComponent } from '../../../../../core';
import { createSvgElement } from '../../../../../utils';

import './info-item.css';

export function renderInfoItem(icon: string, text: string): BaseComponent {
  const item = new BaseComponent({
    className: ['info-item'],
  });

  const iconSlot = new BaseComponent({
    tag: 'span',
    className: ['info-item__icon'],
  });
  iconSlot.element.append(createSvgElement(icon));

  const label = new BaseComponent({
    tag: 'span',
    className: ['info-item__text'],
    text,
  });

  item.append(iconSlot, label);
  return item;
}
