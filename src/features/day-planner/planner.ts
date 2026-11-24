import { BaseComponent } from '../../core';

export function renderDayPlannerSection(): BaseComponent {
  return new BaseComponent({
    className: ['day-planner-section', 'menu-rectangle'],
    text: 'Меню на день',
  });
}
