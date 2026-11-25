import { BaseComponent } from '../../../core';
import { createShoppingSection } from '../shopping-section';
import './to-buy-adding-section.css';

type AddCustomItem = (
  name: string,
  quantity: number | null,
  unit: string | null,
) => boolean;

/** Собирает секцию ручных покупок с формой добавления. */
export function createToBuyAddingSection(onAdd: AddCustomItem) {
  const custom = createShoppingSection('shopping-custom-title', 'Мои добавки');
  custom.section.append(createCustomItemForm(onAdd));
  return custom;
}

/** Проверяет поля формы и очищает их после успешного добавления позиции. */
function createCustomItemForm(onAdd: AddCustomItem) {
  const form = new BaseComponent({
    tag: 'form',
    className: ['shopping-custom-form'],
  });
  const name = new BaseComponent({
    tag: 'input',
    attrs: {
      required: true,
      placeholder: 'Название',
      'aria-label': 'Название',
    },
  });
  const quantity = new BaseComponent({
    tag: 'input',
    attrs: {
      type: 'number',
      min: '0',
      step: 'any',
      placeholder: 'Кол-во',
      'aria-label': 'Количество',
    },
  });
  const unit = new BaseComponent({
    tag: 'input',
    attrs: { placeholder: 'Ед.', 'aria-label': 'Единица измерения' },
  });
  const submit = new BaseComponent({
    tag: 'button',
    text: '+ Добавить',
    attrs: { type: 'submit' },
  });

  name.addEventListener('input', () => name.element.setCustomValidity(''));
  quantity.addEventListener('input', () =>
    quantity.element.setCustomValidity(''),
  );
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const amount =
      quantity.element.value === '' ? null : quantity.element.valueAsNumber;

    if (!name.element.value.trim()) {
      name.element.setCustomValidity('Введите название.');
      name.element.reportValidity();
      return;
    }

    if (!onAdd(name.element.value, amount, unit.element.value)) {
      quantity.element.setCustomValidity('Введите количество больше нуля.');
      quantity.element.reportValidity();
      return;
    }

    form.element.reset();
    name.element.focus();
  });

  return form.append(name, quantity, unit, submit);
}
