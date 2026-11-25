import { BaseComponent } from '../../core';

import './button-with-icon.css';

type ButtonWithIconConfig = {
  text: string;
  icon: SVGElement;
  className?: string[];
  onClick?: () => void;
};

export function createButtonWithIcon(
  config: ButtonWithIconConfig,
): BaseComponent<'button'> {
  const button = new BaseComponent({
    tag: 'button',
    className: ['button-with-icon', ...(config.className ?? [])],
    attrs: { type: 'button' },
  });

  const content = new BaseComponent({
    tag: 'span',
    className: ['button-with-icon__content'],
  });

  const icon = new BaseComponent({
    tag: 'span',
    className: ['button-with-icon__icon'],
  });
  icon.element.append(config.icon);

  const label = new BaseComponent({
    tag: 'span',
    className: ['button-with-icon__label'],
    text: config.text,
  });

  content.append(icon, label);
  button.append(content);

  if (config.onClick) {
    button.addEventListener('click', config.onClick);
  }

  return button;
}
