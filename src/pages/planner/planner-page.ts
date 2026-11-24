import { BaseComponent } from '../../core';
import './planner-page.css';

import { renderCatalogSection } from '../../features';
import { renderDayPlannerSection } from '../../features';

export function renderPlannerPage(): BaseComponent {
  const pageContainer = new BaseComponent({
    className: ['planner-page', 'menu-rectangle'],
  });

  pageContainer.append(renderCatalogSection(), renderDayPlannerSection());

  return pageContainer;
}
