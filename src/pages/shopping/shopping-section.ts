import { BaseComponent } from '../../core';

/** Создаёт секцию со связанным заголовком и списком позиций. */
export function createShoppingSection(id: string, title: string) {
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
