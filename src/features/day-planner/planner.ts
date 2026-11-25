import { BaseComponent } from '../../core';
import type { Menu, Recipe } from '../../types';
import { menuSlotSection } from './menu-slot';

import { MOCK_RECIPES } from '../../mocks';

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

  const recipesById = new Map(MOCK_RECIPES.map((r) => [r.id, r]));

  for (const [slotKey, ids] of Object.entries(dayMenu.slots)) {
    const recipes = ids
      .map((id) => recipesById.get(id))
      .filter((r): r is Recipe => r !== undefined);

    dayPlannerContainer.append(menuSlotSection(slotKey, recipes));
  }

  dayPlannerContainer.append(plannerButton);

  return dayPlannerContainer;
}
