export function createHeader(
  routes: readonly { path: string; label: string }[],
): HTMLElement {
  const header = document.createElement('header');
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Основная навигация');

  for (const { path, label } of routes) {
    const link = document.createElement('a');
    link.href = path;
    link.textContent = label;
    nav.append(link);
  }

  header.append(nav);
  return header;
}
