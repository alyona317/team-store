import { BaseComponent } from '../../core';
import type { Menu, Recipe, ShoppingItem } from '../../types';
import { checkEventTargetElement } from '../../utils';
import { createShoppingListState } from './shopping-list-state';
import './shopping-page.css';

/** Собирает страницу покупок и связывает её элементы с состоянием списка. */
export function renderShoppingPage(
  menu: Menu,
  recipes: Recipe[],
): BaseComponent {
  const state = createShoppingListState(menu, recipes);

  const page = new BaseComponent({ className: ['shopping-page'] });
  const toolbar = new BaseComponent({ className: ['shopping-toolbar'] });
  const title = new BaseComponent({ tag: 'h1', text: 'Список покупок' });
  const clearButton = new BaseComponent({
    tag: 'button',
    text: 'Очистить купленное',
    attrs: { type: 'button' },
  });
  const summary = new BaseComponent({
    tag: 'p',
    className: ['shopping-summary'],
    attrs: { 'aria-live': 'polite' },
  });
  const buy = createShoppingSection('shopping-section-title', 'Купить (0)');
  const custom = createShoppingSection('shopping-custom-title', 'Мои добавки');
  const purchased = createShoppingSection(
    'shopping-purchased-title',
    'Куплено (0)',
  );
  const empty = new BaseComponent({
    tag: 'p',
    className: ['shopping-empty'],
    text: 'В списке покупок пока нет ингредиентов.',
  });

  toolbar.append(title, clearButton);
  buy.section.append(empty);
  custom.section.append(
    createCustomItemForm((name, quantity, unit) => {
      if (!state.addCustomItem(name, quantity, unit)) return false;
      renderItems();
      return true;
    }),
  );
  page.append(toolbar, summary, buy.section, custom.section, purchased.section);

  const formatQuantity = new Intl.NumberFormat('ru-RU', {
    maximumSignificantDigits: 15,
  });

  /** Распределяет позиции по секциям, обновляет счётчики и возвращает фокус на перемещённый чекбокс. */
  function renderItems(focusKey?: string) {
    buy.list.clear();
    custom.list.clear();
    purchased.list.clear();

    let menuItems = 0;
    for (const item of state.items) {
      const { row, checkbox } = createRow(item);
      if (item.checked) {
        purchased.list.append(row);
      } else if (item.source === 'custom') {
        custom.list.append(row);
      } else {
        buy.list.append(row);
        menuItems++;
      }

      if (item.key === focusKey) checkbox.element.focus();
    }

    const { remaining, purchased: purchasedCount } = state.summary;
    summary.setText(
      `Рецептов в меню: ${state.recipeCount} · Осталось купить: ${remaining}`,
    );
    buy.heading.setText(`Купить (${menuItems})`);
    purchased.heading.setText(`Куплено (${purchasedCount})`);
    clearButton.element.disabled = purchasedCount === 0;
    empty.element.hidden = menuItems > 0;
  }

  /** Создаёт строку покупки с количеством, чекбоксом и кнопкой удаления. */
  function createRow({
    key,
    name,
    quantity,
    unit,
    source,
    checked,
  }: ShoppingItem) {
    const row = new BaseComponent({ tag: 'li', className: ['shopping-item'] });
    const label = new BaseComponent({ tag: 'label' });
    const checkbox = new BaseComponent({
      tag: 'input',
      attrs: { type: 'checkbox' },
    });
    checkbox.element.checked = checked;
    row.element.classList.toggle('shopping-item-checked', checked);
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
      state.setChecked(key, input.checked);
      renderItems(key);
    });

    removeButton.addEventListener('click', () => {
      state.removeItem(key);
      renderItems();
    });

    label.append(checkbox, itemName);
    row.append(label, amount, removeButton);
    return { row, checkbox };
  }

  clearButton.addEventListener('click', () => {
    state.clearPurchased();
    renderItems();
  });

  renderItems();
  return page;
}

/** Создаёт секцию со связанным заголовком и списком позиций. */
function createShoppingSection(id: string, title: string) {
  const section = new BaseComponent({
    tag: 'section',
    className: ['shopping-section'],
    attrs: { 'aria-labelledby': id },
  });
  const heading = new BaseComponent({ tag: 'h2', text: title, attrs: { id } });
  const list = new BaseComponent({ tag: 'ul', className: ['shopping-items'] });
  section.append(heading, list);
  return { section, heading, list };
}

/** Проверяет поля формы и очищает их после успешного добавления позиции. */
function createCustomItemForm(
  onAdd: (
    name: string,
    quantity: number | null,
    unit: string | null,
  ) => boolean,
) {
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
