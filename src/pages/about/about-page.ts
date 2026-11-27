import { BaseComponent } from '../../core/base-component';
import './about-page.css';

export function renderAboutUsPage(): string {
  const section = new BaseComponent({
    tag: 'section',
    className: ['about-page'],
  });
  const title = new BaseComponent({ tag: 'h1', text: 'Meal Planner' });
  const description = new BaseComponent({
    tag: 'p',
    text: 'Meal Planner помогает подобрать рецепты, составить меню на день и собрать список продуктов. В списке покупок можно добавлять свои позиции и отмечать купленное.',
  });
  const team = new BaseComponent({
    tag: 'section',
    className: ['about-page__team'],
    attrs: { 'aria-labelledby': 'about-team-title' },
  });
  const teamTitle = new BaseComponent({
    tag: 'h2',
    text: 'Разработчики',
    attrs: { id: 'about-team-title' },
  });
  const columns = new BaseComponent({ className: ['about-page__columns'] });
  const developers = [
    {
      firstName: 'Алёна',
      lastName: 'Ощепкова',
      github: 'alyona317',
      description: 'текст',
    },
    {
      firstName: 'Анна',
      lastName: 'Демьянович',
      github: 'theFoxTale',
      description: 'текст',
    },
  ];

  for (const { firstName, lastName, description, github } of developers) {
    const card = new BaseComponent({
      tag: 'article',
      className: ['about-page__developer'],
    });
    const developerHeader = new BaseComponent({
      className: ['about-page__developer-header'],
    });
    const photo = new BaseComponent({
      className: ['about-page__photo'],
      attrs: { 'aria-hidden': 'true' },
    });
    const name = new BaseComponent({ tag: 'h3', text: firstName });
    name.append(
      new BaseComponent({ tag: 'br' }),
      new BaseComponent({ tag: 'span', text: lastName }),
    );
    developerHeader.append(photo, name);

    card.append(
      developerHeader,
      new BaseComponent({ tag: 'p', text: description }),
      new BaseComponent({
        tag: 'a',
        text: `GitHub · @${github}`,
        attrs: { href: `https://github.com/${github}` },
        className: ['about-page__link'],
      }),
    );
    columns.append(card);
  }

  const link = new BaseComponent({
    tag: 'a',
    text: 'Проект на GitHub',
    attrs: { href: 'https://github.com/alyona317/team-store' },
    className: ['about-page__project-link'],
  });

  team.append(teamTitle, columns);
  section.append(title, description, team, link);
  return section.element.outerHTML;
}
