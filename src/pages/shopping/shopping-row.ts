import { BaseComponent } from '../../core';
import type { ShoppingItem } from '../../model/types';
import { checkEventTargetElement } from '../../utils';

const formatQuantity = new Intl.NumberFormat('ru-RU', {
  maximumSignificantDigits: 15,
});

/** Создаёт строку покупки с количеством, чекбоксом и кнопкой удаления. */
export function createShoppingRow(
  { name, quantity, unit, source, checked }: ShoppingItem,
  onCheck: (checked: boolean) => void,
  onRemove: () => void,
) {
  const row = new BaseComponent({ tag: 'li', className: ['shopping-item'] });
  const label = new BaseComponent({ tag: 'label' });
  const checkbox = new BaseComponent({
    tag: 'input',
    attrs: { type: 'checkbox' },
  });
  checkbox.element.checked = checked;
  const itemName = new BaseComponent({ tag: 'span', text: name });
  const amount = new BaseComponent({
    tag: 'span',
    text:
      quantity === null
        ? source === 'menu'
          ? 'по вкусу'
          : (unit ?? '')
        : [formatQuantity.format(quantity), unit].filter(Boolean).join(' '),
    className: ['shopping-amount'],
  });
  const removeButton = new BaseComponent({
    tag: 'button',
    text: '×',
    attrs: { type: 'button', 'aria-label': `Удалить: ${name}` },
    className: ['shopping-remove'],
  });

  checkbox.addEventListener('change', (event) => {
    const input = checkEventTargetElement(
      HTMLInputElement,
      event.currentTarget,
    );
    onCheck(input.checked);
  });

  removeButton.addEventListener('click', onRemove);

  label.append(checkbox, itemName);
  row.append(label, amount, removeButton);
  return { row, checkbox };
}
