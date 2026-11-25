import { BaseComponent } from '../../../core';
import { createShoppingSection } from '../shopping-section';
import './to-buy-section.css';

/** Собирает список продуктов из меню и сообщение для пустого списка. */
export function createToBuySection() {
  const buy = createShoppingSection('shopping-section-title', 'Купить (0)');
  const empty = new BaseComponent({
    tag: 'p',
    className: ['shopping-empty'],
    text: 'В списке покупок пока нет ингредиентов.',
  });
  buy.section.append(empty);
  return { ...buy, empty };
}
