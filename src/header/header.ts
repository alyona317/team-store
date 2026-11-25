import './header.css';

export function createHeader(
  routes: readonly { path: string; label: string }[],
): HTMLElement {
  const header = document.createElement('header');
  header.className = 'site-header';

  const brand = document.createElement('a');
  brand.className = 'site-header__brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'Meal Planner — О нас');

  const logo = document.createElement('img');
  logo.src = '/images/logo.png';
  logo.alt = 'Meal Planner';
  logo.width = 2172;
  logo.height = 724;
  brand.append(logo);

  const nav = document.createElement('nav');
  nav.className = 'site-header__nav';
  nav.setAttribute('aria-label', 'Основная навигация');

  for (const { path, label } of routes) {
    const link = document.createElement('a');
    link.href = path;
    link.textContent = label;
    nav.append(link);
  }

  header.append(brand, nav);
  return header;
}
