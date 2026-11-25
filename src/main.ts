import './style.css';

import { createHeader } from './header/header';

import { BaseComponent } from './core';
import {
  renderAboutUsPage,
  renderNotFoundPage,
  renderPlannerPage,
  renderShoppingPage,
} from './pages';

// Тип, который может возвращать страница (строка или компонент)
type PageResult = string | BaseComponent;

interface Route {
  path: string;
  label: string;
  render: () => PageResult;
}

const aboutUsRoute = {
  path: '/',
  label: 'О нас',
  render: renderAboutUsPage,
};
const routes: Route[] = [
  aboutUsRoute,
  {
    path: '/catalog',
    label: 'Каталог',
    render: renderPlannerPage,
  },
  {
    path: '/shopping',
    label: 'Список покупок',
    render: () =>
      renderShoppingPage(
        { slots: { breakfast: [], lunch: [], dinner: [], snack: [] } },
        [],
      ),
  },
];

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  const header = createHeader(routes);
  const main = document.createElement('main');
  app.replaceChildren(header, main);

  // Переменная для хранения BaseComponent страницы,
  // нужна чтобы можно было применить destroy() при смене страницы
  let activeComponent: BaseComponent | null = null;

  const renderPage = () => {
    const route = routes.find(({ path }) => path === window.location.pathname);

    const pageResult = route ? route.render() : renderNotFoundPage();

    if (activeComponent) {
      activeComponent.destroy();
      activeComponent = null;
    }

    // Если функция render возвращает строку, то заменяем HTML
    if (typeof pageResult === 'string') {
      main.innerHTML = pageResult;
    } else {
      // если возвращает BaseComponent, то работаем с ним
      activeComponent = pageResult;
      main.replaceChildren(pageResult.element);
    }

    document.title = `${route?.label ?? '404 — Страница не найдена'}`;

    for (const link of header.querySelectorAll('a')) {
      if (link.pathname === route?.path) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  header.addEventListener('click', (event) => {
    const link = event.target instanceof Element && event.target.closest('a');
    if (link && link.href === window.location.href) {
      event.preventDefault();
    }
  });

  renderPage();
}
