import { BaseComponent } from '../../core';
import { menuSlotSection } from './menu-slot';

import type { Menu, Recipe } from '../../types.ts';
import { isMealSlot } from '../../constants.ts';

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

    if (!isMealSlot(slotKey)) continue;
    dayPlannerContainer.append(menuSlotSection(slotKey, recipes));
  }

  dayPlannerContainer.append(plannerButton);

  return dayPlannerContainer;
}
