import { BaseComponent } from '../../core';

import { renderCatalogSection } from '../../features';
import { renderDayPlannerSection } from '../../features';

import { MOCK_MENU_FILLED } from '../../mocks';

import './planner-page.css';

export function renderPlannerPage(): BaseComponent {
  const pageContainer = new BaseComponent({
    className: ['planner-page', 'menu-rectangle'],
  });

  pageContainer.append(
    renderCatalogSection(),
    renderDayPlannerSection(MOCK_MENU_FILLED),
  );

  return pageContainer;
}
