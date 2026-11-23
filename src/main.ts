import './style.css';
import { renderAboutUsPage } from './pages/about-us-page';
import { renderCatalogPage } from './pages/catalog-page';
import { createHeader } from './header';
import { renderNotFoundPage } from './pages/not-found-page';
import { renderShoppingPage } from './pages/shopping-page';

const aboutUsRoute = {
  path: '/',
  label: 'О нас',
  render: renderAboutUsPage,
};
const routes = [
  aboutUsRoute,
  { path: '/catalog', label: 'Каталог', render: renderCatalogPage },
  {
    path: '/shopping',
    label: 'Корзина',
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

  const renderPage = () => {
    const route = routes.find(({ path }) => path === window.location.pathname);
    main.innerHTML = route ? route.render() : renderNotFoundPage();
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
