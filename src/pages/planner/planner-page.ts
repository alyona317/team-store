import { BaseComponent } from '../../core';
import './planner-page.css';

export function renderPlannerPage(): BaseComponent {
  return new BaseComponent({
    className: ['menu-rectangle'],
    text: 'Мой прямоугольник',
  });
}
