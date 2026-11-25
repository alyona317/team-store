import borscht from '../assets/recipes/borscht.webp';
import caesarSalad from '../assets/recipes/caesar-salad.webp';
import croutons from '../assets/recipes/croutons.webp';
import olivierSalad from '../assets/recipes/olivier-salad.webp';
import pancakes from '../assets/recipes/pancakes.webp';
import pastaCarbonara from '../assets/recipes/pasta-carbonara.webp';
import smoothie from '../assets/recipes/smoothie.webp';

import type { Recipe } from '../model/types.ts';

/**
 * Моки рецептов. Покрывают кейсы из ТЗ:
 *  - все 6 категорий DishCategory;
 *  - рецепты с calories и без; с emoji и без;
 *  - cookingTime от 5 до 90 мин;
 *  - мерж по (normalizedName, unit):
 *      • «Куриное яйцо» / «куриное яйцо» — регистр;
 *      • «Сыр пармезан» / «сыр Пармезан» — регистр внутри строки;
 *      • «Свёкла» / «свекла» — ё/е;
 *  - не-мерж по unit: «Молоко, 250 мл» vs «Молоко, 2 стакан»;
 *  - quantity: null — с unit и без (Соль / Лёд).
 */
export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Салат «Цезарь»',
    category: 'salad',
    cookingTime: 20,
    calories: 280,
    emoji: '🥗',
    image: caesarSalad,
    ingredients: [
      { name: 'Куриное яйцо', quantity: 2, unit: 'шт' },
      { name: 'Сыр пармезан', quantity: 50, unit: 'г' },
      { name: 'Куриное филе', quantity: 200, unit: 'г' },
      { name: 'Салат романо', quantity: 100, unit: 'г' },
    ],
  },
  {
    id: 'recipe-2',
    title: 'Борщ',
    category: 'first',
    cookingTime: 90,
    calories: 410,
    emoji: '🍲',
    image: borscht,
    ingredients: [
      { name: 'Свёкла', quantity: 2, unit: 'шт' }, // ё → merge с recipe-7
      { name: 'Куриное яйцо', quantity: 2, unit: 'шт' }, // merge с recipe-1,3,7
      { name: 'Соль', quantity: null, unit: null }, // «по вкусу», unit null
      { name: 'Капуста', quantity: 300, unit: 'г' },
    ],
  },
  {
    id: 'recipe-3',
    title: 'Паста карбонара',
    category: 'main',
    cookingTime: 30,
    calories: 550,
    emoji: '🍝',
    image: pastaCarbonara,
    ingredients: [
      { name: 'сыр Пармезан', quantity: 100, unit: 'г' }, // регистр внутри → merge с recipe-1
      { name: 'куриное яйцо', quantity: 3, unit: 'шт' }, // регистр → merge
      { name: 'Спагетти', quantity: 200, unit: 'г' },
      { name: 'Бекон', quantity: 150, unit: 'г' },
    ],
  },
  {
    id: 'recipe-4',
    title: 'Смузи',
    category: 'drink',
    cookingTime: 5,
    // calories отсутствует — проверка UI «нет ккал»
    emoji: '🥤',
    image: smoothie,
    ingredients: [
      { name: 'Молоко', quantity: 250, unit: 'мл' }, // не merge с recipe-5 (unit разный)
      { name: 'Банан', quantity: 1, unit: 'шт' },
      { name: 'Лёд', quantity: null, unit: null }, // по вкусу без unit
    ],
  },
  {
    id: 'recipe-5',
    title: 'Блинчики',
    category: 'dessert',
    cookingTime: 25,
    // calories отсутствует
    // emoji отсутствует — проверка UI «нет эмодзи»
    image: pancakes,
    ingredients: [
      { name: 'Молоко', quantity: 2, unit: 'стакан' }, // не merge с recipe-4
      { name: 'Яйцо', quantity: 2, unit: 'шт' }, // НЕ путать с «Куриное яйцо»
      { name: 'Мука', quantity: 200, unit: 'г' },
      { name: 'Соль', quantity: null, unit: 'щепотка' }, // по вкусу, unit есть
    ],
  },
  {
    id: 'recipe-6',
    title: 'Гренки',
    category: 'snack',
    cookingTime: 10,
    calories: 200,
    emoji: '🍞',
    image: croutons,
    ingredients: [
      { name: 'Хлеб', quantity: 4, unit: 'ломтик' },
      { name: 'Сыр', quantity: 100, unit: 'г' },
      { name: 'Чеснок', quantity: null, unit: 'зуб.' }, // по вкусу, unit есть
    ],
  },
  {
    id: 'recipe-7',
    title: 'Оливье',
    category: 'salad',
    cookingTime: 40,
    calories: 350,
    emoji: '🥗',
    image: olivierSalad,
    ingredients: [
      { name: 'Куриное яйцо', quantity: 4, unit: 'шт' }, // merge с recipe-1,2,3
      { name: 'свекла', quantity: 1, unit: 'шт' }, // е → merge со «Свёкла» из recipe-2
      { name: 'Картофель', quantity: 3, unit: 'шт' },
      { name: 'Горошек', quantity: 200, unit: 'г' },
    ],
  },
];
