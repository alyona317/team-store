import { BaseComponent } from '../../core';
import { MOCK_MENU_FILLED } from '../../data';

import { renderDailyMenu } from './ui/daily-menu';
import { renderRecipeCatalog } from './ui/recipe-catalog';

import './planner-page.css';

export function renderPlannerPage(): BaseComponent {
  const pageContainer = new BaseComponent({
    className: ['planner-page'],
  });

  pageContainer.append(
    renderRecipeCatalog(),
    renderDailyMenu(MOCK_MENU_FILLED),
  );

  return pageContainer;
}
