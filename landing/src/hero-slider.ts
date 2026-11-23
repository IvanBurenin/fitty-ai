import type { Lang } from './content'

export type HeroDish = {
  key: string
  name: string
  portion: string
  kcal: number
  protein: number
  fat: number
  carbs: number
}

export type HeroSlider = {
  label: string
  aiBadge: string
  prev: string
  next: string
  kcalUnit: string
  protein: string
  fat: string
  carbs: string
  dishes: HeroDish[]
}

export const HERO_SLIDER: Record<Lang, HeroSlider> = {
  en: {
    label: 'Dish recognition examples',
    aiBadge: 'AI recognised',
    prev: 'Previous dish',
    next: 'Next dish',
    kcalUnit: 'kcal',
    protein: 'P',
    fat: 'F',
    carbs: 'C',
    dishes: [
      {
        key: 'caesar',
        name: 'Caesar salad with chicken',
        portion: '350 g',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: 'Borscht with sour cream',
        portion: '350 g',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: 'Spaghetti bolognese',
        portion: '400 g',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
  ru: {
    label: 'Примеры распознавания блюд',
    aiBadge: 'ИИ распознал',
    prev: 'Предыдущее блюдо',
    next: 'Следующее блюдо',
    kcalUnit: 'ккал',
    protein: 'Б',
    fat: 'Ж',
    carbs: 'У',
    dishes: [
      {
        key: 'caesar',
        name: 'Салат цезарь с курицей',
        portion: '350 г',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: 'Борщ со сметаной',
        portion: '350 г',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: 'Спагетти болоньезе',
        portion: '400 г',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
  de: {
    label: 'Beispiele für Gerichtserkennung',
    aiBadge: 'KI erkannt',
    prev: 'Vorheriges Gericht',
    next: 'Nächstes Gericht',
    kcalUnit: 'kcal',
    protein: 'P',
    fat: 'F',
    carbs: 'K',
    dishes: [
      {
        key: 'caesar',
        name: 'Caesar Salad mit Hähnchen',
        portion: '350 g',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: 'Borschtsch mit Sauerrahm',
        portion: '350 g',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: 'Spaghetti Bolognese',
        portion: '400 g',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
  fr: {
    label: 'Exemples de reconnaissance de plats',
    aiBadge: 'IA a reconnu',
    prev: 'Plat précédent',
    next: 'Plat suivant',
    kcalUnit: 'kcal',
    protein: 'P',
    fat: 'L',
    carbs: 'G',
    dishes: [
      {
        key: 'caesar',
        name: 'Salade César au poulet',
        portion: '350 g',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: 'Bortsch à la crème',
        portion: '350 g',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: 'Spaghetti bolognaise',
        portion: '400 g',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
  es: {
    label: 'Ejemplos de reconocimiento de platos',
    aiBadge: 'IA reconocida',
    prev: 'Plato anterior',
    next: 'Plato siguiente',
    kcalUnit: 'kcal',
    protein: 'P',
    fat: 'G',
    carbs: 'C',
    dishes: [
      {
        key: 'caesar',
        name: 'Ensalada César con pollo',
        portion: '350 g',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: 'Borsch con crema agria',
        portion: '350 g',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: 'Espaguetis boloñesa',
        portion: '400 g',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
  zh: {
    label: '菜品识别示例',
    aiBadge: 'AI 已识别',
    prev: '上一道菜',
    next: '下一道菜',
    kcalUnit: '千卡',
    protein: '蛋白',
    fat: '脂肪',
    carbs: '碳水',
    dishes: [
      {
        key: 'caesar',
        name: '凯撒鸡肉沙拉',
        portion: '350 克',
        kcal: 420,
        protein: 31,
        fat: 24,
        carbs: 18,
      },
      {
        key: 'borscht',
        name: '酸奶油罗宋汤',
        portion: '350 克',
        kcal: 260,
        protein: 9,
        fat: 13,
        carbs: 27,
      },
      {
        key: 'bolognese',
        name: '博洛尼亚肉酱面',
        portion: '400 克',
        kcal: 610,
        protein: 33,
        fat: 21,
        carbs: 68,
      },
    ],
  },
}
