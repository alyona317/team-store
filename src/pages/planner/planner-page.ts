import { BaseComponent } from '../../core';
import { MOCK_MENU_FILLED } from '../../data';

import { renderDailyMenu } from './ui/daily-menu';
import { renderRecipeCatalog } from './ui/recipe-catalog';

import './planner-page.css';

export function renderPlannerPage(): BaseComponent {
  const pageContainer = new BaseComponent({
    className: ['planner-page'],
  });

  const pageWrapper = new BaseComponent({
    className: ['planner-page__wrapper'],
  });

  pageWrapper.append(renderRecipeCatalog(), renderDailyMenu(MOCK_MENU_FILLED));

  pageContainer.append(pageWrapper);

  return pageContainer;
}
