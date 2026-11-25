import { BaseComponent } from '../../core';
import { MOCK_MENU_FILLED } from '../../data';

import { renderDailyMenuSection } from './daily-menu';
import { renderRecipesSection } from './recipes';

import './planner-page.css';

export function renderPlannerPage(): BaseComponent {
  const pageContainer = new BaseComponent({
    className: ['planner-page', 'menu-rectangle'],
  });

  pageContainer.append(
    renderRecipesSection(),
    renderDailyMenuSection(MOCK_MENU_FILLED),
  );

  return pageContainer;
}
