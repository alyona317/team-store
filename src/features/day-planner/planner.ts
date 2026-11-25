import { BaseComponent } from '../../core';
import type { Menu } from '../../types';
import { menuSlotSection } from './menu-slot';

import './planner.css';

export function renderDayPlannerSection(dayMenu: Menu): BaseComponent {
  const dayPlannerContainer = new BaseComponent({
    className: ['day-planner-section', 'menu-rectangle'],
  });

  const dayHeader = new BaseComponent({
    className: ['day-planner-header', 'menu-rectangle'],
    text: 'Моё меню на день',
  });

  const plannerButton = new BaseComponent({
    tag: 'button',
    className: ['day-planner-button', 'menu-rectangle'],
    text: 'Сформировать список покупок',
  });

  dayPlannerContainer.append(dayHeader);

  for (const [slotKey, recipes] of Object.entries(dayMenu.slots)) {
    dayPlannerContainer.append(menuSlotSection(slotKey, recipes));
  }

  dayPlannerContainer.append(plannerButton);

  return dayPlannerContainer;
}
