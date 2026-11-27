import { BaseComponent } from '../../core/base-component';
import './not-found-page.css';
import emptyPlateUrl from '../../assets/images/empty_plate.png';

export function renderNotFoundPage(): string {
  const section = new BaseComponent({
    tag: 'section',
    className: ['section'],
  });

  const title = new BaseComponent({
    tag: 'h1',
    text: '404 — Страница не найдена',
  });
  const message = new BaseComponent({
    tag: 'p',
    text: 'Проверьте адрес или вернитесь на главную страницу.',
  });
  const image = new BaseComponent({
    tag: 'img',
    attrs: { src: emptyPlateUrl, alt: 'Пустая тарелка' },
    className: ['empty-plate'],
  });
  const link = new BaseComponent({
    tag: 'a',
    text: 'На главную',
    attrs: { href: '/' },
    className: ['link-to-main'],
  });

  section.append(title, message, image, link);
  return section.element.outerHTML;
}
