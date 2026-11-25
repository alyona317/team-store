import searchIcon from '../../../../../assets/svg/search.svg?raw';

import { BaseComponent } from '../../../../../core';
import { createSvgElement } from '../../../../../utils';

import './search-field.css';

type SearchFieldOptions = {
  placeholder: string;
  label: string;
};

export function renderSearchField({
  placeholder,
  label,
}: SearchFieldOptions): BaseComponent<'label'> {
  const search = new BaseComponent({
    tag: 'label',
    className: ['search-field'],
  });

  const icon = new BaseComponent({
    tag: 'span',
    className: ['search-field__icon'],
    attrs: { 'aria-hidden': 'true' },
  });
  icon.element.append(createSvgElement(searchIcon));

  const input = new BaseComponent({
    tag: 'input',
    className: ['search-field__input'],
    attrs: {
      type: 'search',
      placeholder,
      'aria-label': label,
    },
  });

  search.append(icon, input);
  return search;
}
