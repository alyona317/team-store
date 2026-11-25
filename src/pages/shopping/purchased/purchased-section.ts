import { createShoppingSection } from '../shopping-section';
import './purchased-section.css';

/** Собирает секцию для покупок, отмеченных как купленные. */
export function createPurchasedSection() {
  const purchased = createShoppingSection(
    'shopping-purchased-title',
    'Куплено (0)',
  );
  purchased.section.element.classList.add('shopping-purchased');
  return purchased;
}
