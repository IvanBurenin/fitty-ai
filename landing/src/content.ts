export type Lang = 'en' | 'ru' | 'de' | 'fr' | 'es' | 'zh'

export const LANGUAGES: { code: Lang; native: string; short: string }[] = [
  { code: 'en', native: 'English', short: 'EN' },
  { code: 'ru', native: 'Русский', short: 'RU' },
  { code: 'de', native: 'Deutsch', short: 'DE' },
  { code: 'fr', native: 'Français', short: 'FR' },
  { code: 'es', native: 'Español', short: 'ES' },
  { code: 'zh', native: '中文', short: 'ZH' },
]

export function isLang(value: string): value is Lang {
  return LANGUAGES.some((item) => item.code === value)
}

export const SCREEN_KEYS = [
  'home',
  'diary',
  'add',
  'recipes',
  'progress',
  'ai',
] as const

type ScreenKey = (typeof SCREEN_KEYS)[number]

export type Content = {
  meta: { title: string; description: string; ogLocale: string }
  langLabel: string
  headerCta: string
  nav: { app: string; ai: string; recipes: string; languages: string; faq: string }
  hero: {
    eyebrow: string
    title: string
    lede: string
    cta: string
    secondary: string
    meta: string
    floatLabel: string
    floatTitle: string
    floatSub: string
    floatAi: string
  }
  pillars: {
    label: string
    title: string
    items: { title: string; text: string }[]
  }
  screens: {
    label: string
    title: string
    lead: string
    items: { label: string; title: string; text: string }[]
  }
  ai: {
    label: string
    title: string
    body: string
    features: string[]
    prompts: string[]
    link: string
  }
  recipes: {
    label: string
    title: string
    body: string
    stats: { value: string; label: string }[]
    link: string
  }
  progress: {
    label: string
    title: string
    body: string
    chips: string[]
    link: string
  }
  languages: { label: string; title: string; lead: string }
  faq: {
    label: string
    title: string
    items: { q: string; a: string }[]
  }
  cta: { eyebrow: string; title: string; body: string; button: string }
  footer: { tagline: string; telegram: string; github: string; author: string }
  screenKeys: ScreenKey[]
}

const EN: Content = {
  meta: {
    title: 'Fitty — AI food diary in Telegram',
    description:
      'A calm food diary in Telegram. Snap a photo, say what you ate, or ask AI — Fitty counts calories and macros, suggests recipes, and keeps your goal in sight.',
    ogLocale: 'en_US',
  },
  langLabel: 'Language',
  headerCta: 'Open in Telegram',
  nav: {
    app: 'The app',
    ai: 'AI',
    recipes: 'Recipes',
    languages: 'Languages',
    faq: 'FAQ',
  },
  hero: {
    eyebrow: 'Telegram Mini App · Nutrition without the spreadsheet',
    title: 'Eat well.\nLet *AI* do the counting.',
    lede: 'Snap your plate, type a sentence, or say it out loud. Fitty estimates calories and macros, keeps a quiet diary, and turns what is already in the fridge into dinner.',
    cta: 'Open in Telegram',
    secondary: 'See the app',
    meta: 'Free to start · No install · Six languages',
    floatLabel: 'Today',
    floatTitle: '997 kcal left',
    floatSub: 'Protein 86 / 144 g',
    floatAi: 'AI logged 3 meals',
  },
  pillars: {
    label: 'Why Fitty',
    title: 'Nutrition that fits your day — not the other way around.',
    items: [
      {
        title: 'Log in seconds',
        text: 'A photo, a sentence, or a voice note. AI recognises the dish and fills in calories and macros — you just confirm.',
      },
      {
        title: 'Targets that follow you',
        text: 'A personal calorie and macro plan built around your goal, body and pace. It recalculates when your weight changes.',
      },
      {
        title: 'Cook with what you have',
        text: 'AI recipes from fridge ingredients, a recipe shelf, and one-tap logging. No separate notes app.',
      },
    ],
  },
  screens: {
    label: 'Inside the app',
    title: 'A calm place for food.',
    lead: 'Six screens, no noise: what you ate, what is left, and what to cook next.',
    items: [
      {
        label: 'Overview',
        title: 'Today, at a glance',
        text: 'Calories left, macros and meals. Add food or scan a plate in one tap.',
      },
      {
        label: 'Diary',
        title: 'Every day, in order',
        text: 'Breakfast to snacks with portions and calories. Edit or move an entry when plans change.',
      },
      {
        label: 'Add food',
        title: 'Four ways to log',
        text: 'Photo, recipes, AI text or your own dish. Adjust grams and save without leaving the sheet.',
      },
      {
        label: 'Recipes',
        title: 'A recipe shelf',
        text: 'Generate a recipe, save the best ones, search your own collection and log a portion.',
      },
      {
        label: 'Progress',
        title: 'Trends, not pressure',
        text: 'Weight chart, average calories and days with a diary. No leaderboards, no streak guilt.',
      },
      {
        label: 'AI assistant',
        title: 'Ask — and it is logged',
        text: 'Say what you ate, ask for a 500 kcal dinner, or build a recipe from what is in the fridge.',
      },
    ],
  },
  ai: {
    label: 'AI assistant',
    title: 'Snap it. Type it. Say it.',
    body: "Fitty understands food in plain language. The assistant estimates portions, suggests meals that fit your remaining calories, and writes everything into the diary.",
    features: [
      'Photo recognition with portion estimates',
      'Voice input in your language',
      'Recipes from fridge ingredients',
      'Logging and edits right in the chat',
    ],
    prompts: ['“Two eggs and toast”', '“Dinner under 500 kcal”', '“What can I cook with chicken?”'],
    link: 'Try it in Telegram',
  },
  recipes: {
    label: 'Recipes & fridge',
    title: 'Dinner is probably already at home.',
    body: 'Tell Fitty what is in the fridge and it will build a recipe with calories and macros. Save it, adjust the servings, and add the cooked portion to your day.',
    stats: [
      { value: '1 photo', label: 'to a full recipe' },
      { value: '4 ways', label: 'to log a meal' },
      { value: '6', label: 'languages' },
    ],
    link: 'Open the recipe shelf',
  },
  progress: {
    label: 'Progress',
    title: 'Small steps, visible.',
    body: 'Weight, average calories and the number of days you kept a diary — in one quiet view. Week, month or all time, without pressure.',
    chips: ['Weight chart', 'Average calories', 'Diary days', 'No leaderboard'],
    link: 'See your progress',
  },
  languages: {
    label: 'Languages',
    title: 'Six languages, one diary.',
    lead: 'The Mini App and the bot speak English, Russian, German, French, Spanish and Chinese. Food, recipes and the assistant follow your language.',
  },
  faq: {
    label: 'FAQ',
    title: 'Good to know.',
    items: [
      {
        q: 'Is Fitty free?',
        a: 'Yes. Open the bot and start logging — no install, no separate account. The core diary, targets, recipes and AI assistant are available from day one.',
      },
      {
        q: 'Do I need to install an app?',
        a: "No. Fitty lives inside Telegram as a Mini App and opens from the bot's menu button on iOS, Android, desktop and web.",
      },
      {
        q: 'How accurate is the AI?',
        a: 'Photo and text estimates are a starting point: you can adjust grams and macros before saving. The more you confirm, the cleaner your diary.',
      },
      {
        q: 'What happens to my data?',
        a: 'Your diary and profile live in your own account and are used only for calculations. They are not shared with other users or shown in any leaderboard.',
      },
    ],
  },
  cta: {
    eyebrow: 'Next meal',
    title: 'Start with the plate in front of you.',
    body: 'Open Fitty in Telegram, add your first meal, and see how the day looks.',
    button: 'Open Fitty in Telegram',
  },
  footer: {
    tagline: 'AI food diary in Telegram',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Ivan Burenin',
  },
  screenKeys: [...SCREEN_KEYS],
}

const RU: Content = {
  meta: {
    title: 'Fitty — дневник питания с ИИ в Telegram',
    description:
      'Спокойный дневник питания в Telegram. Сфотографируйте блюдо, опишите его словами или голосом — Fitty посчитает калории и БЖУ, предложит рецепт и поможет держать цель.',
    ogLocale: 'ru_RU',
  },
  langLabel: 'Язык',
  headerCta: 'Открыть в Telegram',
  nav: {
    app: 'Приложение',
    ai: 'ИИ',
    recipes: 'Рецепты',
    languages: 'Языки',
    faq: 'Вопросы',
  },
  hero: {
    eyebrow: 'Telegram Mini App · Питание без таблиц',
    title: 'Ешьте спокойно.\nСчитать будет *ИИ*.',
    lede: 'Сфотографируйте тарелку, напишите пару слов или просто скажите голосом. Fitty оценит калории и БЖУ, будет вести тихий дневник и подскажет, что приготовить из того, что уже есть в холодильнике.',
    cta: 'Открыть в Telegram',
    secondary: 'Посмотреть экраны',
    meta: 'Бесплатно · Без установки · Шесть языков',
    floatLabel: 'Сегодня',
    floatTitle: 'Осталось 997 ккал',
    floatSub: 'Белки 86 / 144 г',
    floatAi: 'ИИ записал 3 приёма',
  },
  pillars: {
    label: 'Почему Fitty',
    title: 'Питание подстраивается под день, а не наоборот.',
    items: [
      {
        title: 'Запись за секунды',
        text: 'Фото, фраза или голосовое. ИИ распознаёт блюдо и заполняет калории и БЖУ — остаётся только подтвердить.',
      },
      {
        title: 'Цели, которые меняются',
        text: 'Личный план калорий и БЖУ под вашу цель, тело и темп. Пересчитывается, когда меняется вес.',
      },
      {
        title: 'Готовьте из того, что есть',
        text: 'ИИ-рецепты из продуктов в холодильнике, полка рецептов и добавление порции в дневник в один тап.',
      },
    ],
  },
  screens: {
    label: 'Внутри приложения',
    title: 'Спокойное место для еды.',
    lead: 'Шесть экранов без лишнего шума: что съедено, сколько осталось и что приготовить дальше.',
    items: [
      {
        label: 'Обзор',
        title: 'День как на ладони',
        text: 'Остаток калорий, БЖУ и приёмы пищи. Добавить еду или сфотографировать тарелку — в один тап.',
      },
      {
        label: 'Дневник',
        title: 'Каждый день по порядку',
        text: 'От завтрака до перекуса: порции и калории. Запись можно изменить или перенести.',
      },
      {
        label: 'Добавить еду',
        title: 'Четыре способа записать',
        text: 'Фото, рецепты, ИИ-текст или своё блюдо. Поправьте граммы и сохраните, не выходя из шторки.',
      },
      {
        label: 'Рецепты',
        title: 'Полка рецептов',
        text: 'Сгенерируйте рецепт, сохраните лучшие, найдите свои и добавьте порцию в дневник.',
      },
      {
        label: 'Прогресс',
        title: 'Тренды без давления',
        text: 'График веса, средние калории и дни с дневником. Без рейтингов и чувства вины.',
      },
      {
        label: 'ИИ-ассистент',
        title: 'Спросите — и уже записано',
        text: 'Скажите, что съели, попросите ужин на 500 ккал или рецепт из того, что есть.',
      },
    ],
  },
  ai: {
    label: 'ИИ-ассистент',
    title: 'Сфотографируйте. Напишите. Скажите.',
    body: 'Fitty понимает еду обычными словами. Ассистент оценит порции, предложит блюдо под остаток калорий и сразу запишет всё в дневник.',
    features: [
      'Распознавание по фото с оценкой порций',
      'Голосовой ввод на вашем языке',
      'Рецепты из продуктов в холодильнике',
      'Запись и правки прямо в чате',
    ],
    prompts: ['«Два яйца и тост»', '«Ужин до 500 ккал»', '«Что приготовить из курицы?»'],
    link: 'Попробовать в Telegram',
  },
  recipes: {
    label: 'Рецепты и холодильник',
    title: 'Ужин, скорее всего, уже дома.',
    body: 'Скажите Fitty, что лежит в холодильнике, — и получите рецепт с калориями и БЖУ. Сохраните его, измените порции и добавьте готовое блюдо в день.',
    stats: [
      { value: '1 фото', label: 'до готового рецепта' },
      { value: '4 способа', label: 'записать приём пищи' },
      { value: '6', label: 'языков' },
    ],
    link: 'Открыть полку рецептов',
  },
  progress: {
    label: 'Прогресс',
    title: 'Маленькие шаги видно.',
    body: 'Вес, средние калории и число дней с дневником — в одном спокойном экране. Неделя, месяц или всё время, без давления.',
    chips: ['График веса', 'Средние калории', 'Дни с дневником', 'Без рейтингов'],
    link: 'Посмотреть прогресс',
  },
  languages: {
    label: 'Языки',
    title: 'Шесть языков, один дневник.',
    lead: 'Mini App и бот говорят на английском, русском, немецком, французском, испанском и китайском. Еда, рецепты и ассистент следуют за языком.',
  },
  faq: {
    label: 'Вопросы',
    title: 'Полезно знать.',
    items: [
      {
        q: 'Fitty бесплатный?',
        a: 'Да. Откройте бота и начните записывать — без установки и отдельного аккаунта. Дневник, цели, рецепты и ИИ-ассистент доступны с первого дня.',
      },
      {
        q: 'Нужно что-то устанавливать?',
        a: 'Нет. Fitty живёт внутри Telegram как Mini App и открывается кнопкой меню в боте на iOS, Android, компьютере и в вебе.',
      },
      {
        q: 'Насколько точен ИИ?',
        a: 'Оценки по фото и тексту — отправная точка: граммы и БЖУ можно поправить до сохранения. Чем чаще вы подтверждаете, тем точнее дневник.',
      },
      {
        q: 'Что происходит с данными?',
        a: 'Дневник и профиль хранятся в вашем аккаунте и используются только для расчётов. Они не передаются другим пользователям и не попадают в рейтинги.',
      },
    ],
  },
  cta: {
    eyebrow: 'Следующий приём пищи',
    title: 'Начните с тарелки, которая перед вами.',
    body: 'Откройте Fitty в Telegram, добавьте первое блюдо и посмотрите, как складывается день.',
    button: 'Открыть Fitty в Telegram',
  },
  footer: {
    tagline: 'Дневник питания с ИИ в Telegram',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Иван Буренин',
  },
  screenKeys: [...SCREEN_KEYS],
}

const DE: Content = {
  meta: {
    title: 'Fitty — KI-Ernährungstagebuch in Telegram',
    description:
      'Ein ruhiges Ernährungstagebuch in Telegram. Foto machen, Mahlzeit beschreiben oder sprechen — Fitty schätzt Kalorien und Makros, schlägt Rezepte vor und hält dein Ziel im Blick.',
    ogLocale: 'de_DE',
  },
  langLabel: 'Sprache',
  headerCta: 'In Telegram öffnen',
  nav: {
    app: 'Die App',
    ai: 'KI',
    recipes: 'Rezepte',
    languages: 'Sprachen',
    faq: 'FAQ',
  },
  hero: {
    eyebrow: 'Telegram Mini App · Ernährung ohne Tabellen',
    title: 'Iss gut.\nDas Zählen übernimmt *die KI*.',
    lede: 'Fotografiere deinen Teller, schreibe einen Satz oder sag es einfach. Fitty schätzt Kalorien und Makros, führt ein ruhiges Tagebuch und macht aus dem Kühlschrank ein Abendessen.',
    cta: 'In Telegram öffnen',
    secondary: 'Die App ansehen',
    meta: 'Kostenlos starten · Keine Installation · Sechs Sprachen',
    floatLabel: 'Heute',
    floatTitle: '997 kcal übrig',
    floatSub: 'Protein 86 / 144 g',
    floatAi: 'KI hat 3 Mahlzeiten erfasst',
  },
  pillars: {
    label: 'Warum Fitty',
    title: 'Ernährung passt sich deinem Tag an — nicht umgekehrt.',
    items: [
      {
        title: 'In Sekunden erfassen',
        text: 'Foto, Satz oder Sprachnachricht. Die KI erkennt das Gericht und füllt Kalorien und Makros aus — du bestätigst nur.',
      },
      {
        title: 'Ziele, die mitgehen',
        text: 'Ein persönlicher Kalorien- und Makroplan nach Ziel, Körper und Tempo. Er wird neu berechnet, wenn sich dein Gewicht ändert.',
      },
      {
        title: 'Kochen mit dem, was da ist',
        text: 'KI-Rezepte aus Kühlschrankzutaten, ein Rezeptregal und Portionen mit einem Tippen erfassen.',
      },
    ],
  },
  screens: {
    label: 'In der App',
    title: 'Ein ruhiger Ort fürs Essen.',
    lead: 'Sechs Screens ohne Lärm: was du gegessen hast, was übrig ist und was als Nächstes auf den Tisch kommt.',
    items: [
      {
        label: 'Übersicht',
        title: 'Der Tag auf einen Blick',
        text: 'Übrige Kalorien, Makros und Mahlzeiten. Essen hinzufügen oder Teller scannen — mit einem Tippen.',
      },
      {
        label: 'Tagebuch',
        title: 'Jeder Tag, der Reihe nach',
        text: 'Vom Frühstück bis zum Snack mit Portionen und Kalorien. Einträge lassen sich ändern oder verschieben.',
      },
      {
        label: 'Essen hinzufügen',
        title: 'Vier Wege zum Eintrag',
        text: 'Foto, Rezepte, KI-Text oder eigenes Gericht. Gramm anpassen und speichern, ohne das Sheet zu verlassen.',
      },
      {
        label: 'Rezepte',
        title: 'Ein Rezeptregal',
        text: 'Rezept generieren, die besten speichern, eigene durchsuchen und eine Portion erfassen.',
      },
      {
        label: 'Fortschritt',
        title: 'Trends statt Druck',
        text: 'Gewichtskurve, Durchschnittskalorien und Tage mit Tagebuch. Keine Ranglisten, kein Streak-Druck.',
      },
      {
        label: 'KI-Assistent',
        title: 'Frag — und es ist erfasst',
        text: 'Sag, was du gegessen hast, wünsch dir ein Abendessen unter 500 kcal oder ein Rezept aus dem Kühlschrank.',
      },
    ],
  },
  ai: {
    label: 'KI-Assistent',
    title: 'Fotografieren. Tippen. Sagen.',
    body: 'Fitty versteht Essen in normaler Sprache. Der Assistent schätzt Portionen, schlägt Gerichte passend zu deinen restlichen Kalorien vor und schreibt alles ins Tagebuch.',
    features: [
      'Fotoerkennung mit Portionsschätzung',
      'Spracheingabe in deiner Sprache',
      'Rezepte aus Kühlschrankzutaten',
      'Erfassen und Bearbeiten im Chat',
    ],
    prompts: ['„Zwei Eier und Toast“', '„Abendessen unter 500 kcal“', '„Was koche ich mit Hähnchen?“'],
    link: 'In Telegram ausprobieren',
  },
  recipes: {
    label: 'Rezepte & Kühlschrank',
    title: 'Das Abendessen ist wahrscheinlich schon da.',
    body: 'Sag Fitty, was im Kühlschrank liegt, und du bekommst ein Rezept mit Kalorien und Makros. Speichern, Portionen anpassen und die gekochte Portion in den Tag legen.',
    stats: [
      { value: '1 Foto', label: 'zum fertigen Rezept' },
      { value: '4 Wege', label: 'eine Mahlzeit zu erfassen' },
      { value: '6', label: 'Sprachen' },
    ],
    link: 'Zum Rezeptregal',
  },
  progress: {
    label: 'Fortschritt',
    title: 'Kleine Schritte, sichtbar.',
    body: 'Gewicht, Durchschnittskalorien und Tage mit Tagebuch — in einer ruhigen Ansicht. Woche, Monat oder alles, ohne Druck.',
    chips: ['Gewichtskurve', 'Durchschnittskalorien', 'Tage mit Tagebuch', 'Keine Rangliste'],
    link: 'Fortschritt ansehen',
  },
  languages: {
    label: 'Sprachen',
    title: 'Sechs Sprachen, ein Tagebuch.',
    lead: 'Mini App und Bot sprechen Englisch, Russisch, Deutsch, Französisch, Spanisch und Chinesisch. Essen, Rezepte und Assistent folgen deiner Sprache.',
  },
  faq: {
    label: 'FAQ',
    title: 'Gut zu wissen.',
    items: [
      {
        q: 'Ist Fitty kostenlos?',
        a: 'Ja. Bot öffnen und loslegen — keine Installation, kein separates Konto. Tagebuch, Ziele, Rezepte und KI-Assistent sind von Anfang an dabei.',
      },
      {
        q: 'Muss ich eine App installieren?',
        a: 'Nein. Fitty lebt als Mini App in Telegram und öffnet sich über die Menüschaltfläche des Bots auf iOS, Android, Desktop und im Web.',
      },
      {
        q: 'Wie genau ist die KI?',
        a: 'Foto- und Textschätzungen sind ein Anfang: Gramm und Makros lassen sich vor dem Speichern anpassen. Je öfter du bestätigst, desto sauberer das Tagebuch.',
      },
      {
        q: 'Was passiert mit meinen Daten?',
        a: 'Tagebuch und Profil liegen in deinem Konto und dienen nur den Berechnungen. Sie werden nicht mit anderen geteilt und erscheinen in keiner Rangliste.',
      },
    ],
  },
  cta: {
    eyebrow: 'Nächste Mahlzeit',
    title: 'Fang mit dem Teller vor dir an.',
    body: 'Öffne Fitty in Telegram, erfasse deine erste Mahlzeit und sieh, wie der Tag aussieht.',
    button: 'Fitty in Telegram öffnen',
  },
  footer: {
    tagline: 'KI-Ernährungstagebuch in Telegram',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Ivan Burenin',
  },
  screenKeys: [...SCREEN_KEYS],
}

const FR: Content = {
  meta: {
    title: 'Fitty — journal alimentaire IA dans Telegram',
    description:
      'Un journal alimentaire apaisé dans Telegram. Photographiez votre assiette, décrivez le repas ou dictez-le — Fitty estime calories et macros, propose des recettes et garde votre objectif en vue.',
    ogLocale: 'fr_FR',
  },
  langLabel: 'Langue',
  headerCta: 'Ouvrir dans Telegram',
  nav: {
    app: "L'app",
    ai: 'IA',
    recipes: 'Recettes',
    languages: 'Langues',
    faq: 'FAQ',
  },
  hero: {
    eyebrow: 'Mini App Telegram · Manger sans tableur',
    title: "Mangez bien.\nLaissez *l'IA* compter.",
    lede: "Photographiez votre assiette, écrivez une phrase ou dites-le simplement. Fitty estime calories et macros, tient un journal discret et transforme le frigo en dîner.",
    cta: 'Ouvrir dans Telegram',
    secondary: "Voir l'app",
    meta: 'Gratuit · Sans installation · Six langues',
    floatLabel: "Aujourd'hui",
    floatTitle: '997 kcal restantes',
    floatSub: 'Protéines 86 / 144 g',
    floatAi: "L'IA a noté 3 repas",
  },
  pillars: {
    label: 'Pourquoi Fitty',
    title: "La nutrition s'adapte à votre journée, pas l'inverse.",
    items: [
      {
        title: 'Noter en quelques secondes',
        text: "Une photo, une phrase ou un message vocal. L'IA reconnaît le plat et remplit calories et macros — vous confirmez.",
      },
      {
        title: 'Des objectifs qui suivent',
        text: 'Un plan personnel de calories et macros selon votre objectif, votre corps et votre rythme. Recalculé quand le poids change.',
      },
      {
        title: "Cuisiner avec ce qu'on a",
        text: "Des recettes IA à partir du frigo, une étagère de recettes et l'ajout d'une portion en un geste.",
      },
    ],
  },
  screens: {
    label: "Dans l'app",
    title: 'Un lieu calme pour manger.',
    lead: 'Six écrans sans bruit : ce que vous avez mangé, ce qu’il reste et quoi cuisiner ensuite.',
    items: [
      {
        label: 'Aperçu',
        title: 'La journée en un regard',
        text: 'Calories restantes, macros et repas. Ajouter un aliment ou scanner une assiette en un geste.',
      },
      {
        label: 'Journal',
        title: 'Chaque jour, dans l’ordre',
        text: 'Du petit-déjeuner au snack, portions et calories. Modifiez ou déplacez une entrée.',
      },
      {
        label: 'Ajouter un aliment',
        title: 'Quatre façons de noter',
        text: 'Photo, recettes, texte IA ou plat maison. Ajustez les grammes et enregistrez sans quitter la feuille.',
      },
      {
        label: 'Recettes',
        title: 'Une étagère de recettes',
        text: 'Générez une recette, gardez les meilleures, cherchez les vôtres et ajoutez une portion.',
      },
      {
        label: 'Progrès',
        title: 'Des tendances, pas de pression',
        text: 'Courbe de poids, calories moyennes et jours de journal. Sans classement ni culpabilité.',
      },
      {
        label: 'Assistant IA',
        title: "Demandez — c'est noté",
        text: "Dites ce que vous avez mangé, demandez un dîner à 500 kcal ou une recette avec ce qu'il y a.",
      },
    ],
  },
  ai: {
    label: 'Assistant IA',
    title: 'Photographiez. Écrivez. Dites-le.',
    body: "Fitty comprend la nourriture en langage courant. L'assistant estime les portions, propose des plats selon vos calories restantes et écrit tout dans le journal.",
    features: [
      'Reconnaissance photo avec estimation des portions',
      'Saisie vocale dans votre langue',
      'Recettes à partir du frigo',
      'Noter et modifier dans le chat',
    ],
    prompts: ['« Deux œufs et du pain »', '« Dîner sous 500 kcal »', '« Que cuisiner avec du poulet ? »'],
    link: 'Essayer dans Telegram',
  },
  recipes: {
    label: 'Recettes & frigo',
    title: 'Le dîner est sûrement déjà là.',
    body: "Dites à Fitty ce qu'il y a dans le frigo et obtenez une recette avec calories et macros. Enregistrez-la, ajustez les portions et ajoutez la part cuisinée à votre journée.",
    stats: [
      { value: '1 photo', label: "jusqu'à la recette" },
      { value: '4 façons', label: 'de noter un repas' },
      { value: '6', label: 'langues' },
    ],
    link: "Ouvrir l'étagère de recettes",
  },
  progress: {
    label: 'Progrès',
    title: 'Les petits pas se voient.',
    body: "Poids, calories moyennes et jours de journal — dans une vue calme. Semaine, mois ou tout l'historique, sans pression.",
    chips: ['Courbe de poids', 'Calories moyennes', 'Jours de journal', 'Sans classement'],
    link: 'Voir vos progrès',
  },
  languages: {
    label: 'Langues',
    title: 'Six langues, un journal.',
    lead: 'La Mini App et le bot parlent anglais, russe, allemand, français, espagnol et chinois. Aliments, recettes et assistant suivent votre langue.',
  },
  faq: {
    label: 'FAQ',
    title: 'Bon à savoir.',
    items: [
      {
        q: 'Fitty est-il gratuit ?',
        a: "Oui. Ouvrez le bot et commencez — sans installation ni compte séparé. Journal, objectifs, recettes et assistant IA sont disponibles dès le premier jour.",
      },
      {
        q: 'Faut-il installer une app ?',
        a: "Non. Fitty vit dans Telegram comme Mini App et s'ouvre depuis le menu du bot sur iOS, Android, ordinateur et web.",
      },
      {
        q: "Quelle est la précision de l'IA ?",
        a: "Les estimations photo et texte sont un point de départ : ajustez grammes et macros avant d'enregistrer. Plus vous confirmez, plus le journal est juste.",
      },
      {
        q: 'Que deviennent mes données ?',
        a: 'Journal et profil restent dans votre compte et servent uniquement aux calculs. Ils ne sont ni partagés ni affichés dans un classement.',
      },
    ],
  },
  cta: {
    eyebrow: 'Prochain repas',
    title: "Commencez par l'assiette devant vous.",
    body: 'Ouvrez Fitty dans Telegram, ajoutez votre premier repas et voyez la journée se dessiner.',
    button: 'Ouvrir Fitty dans Telegram',
  },
  footer: {
    tagline: 'Journal alimentaire IA dans Telegram',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Ivan Burenin',
  },
  screenKeys: [...SCREEN_KEYS],
}

const ES: Content = {
  meta: {
    title: 'Fitty — diario de comida con IA en Telegram',
    description:
      'Un diario de comida tranquilo en Telegram. Haz una foto, describe la comida o dicta — Fitty estima calorías y macros, sugiere recetas y mantiene tu objetivo a la vista.',
    ogLocale: 'es_ES',
  },
  langLabel: 'Idioma',
  headerCta: 'Abrir en Telegram',
  nav: {
    app: 'La app',
    ai: 'IA',
    recipes: 'Recetas',
    languages: 'Idiomas',
    faq: 'FAQ',
  },
  hero: {
    eyebrow: 'Mini App de Telegram · Comer sin hojas de cálculo',
    title: 'Come bien.\nQue *la IA* cuente.',
    lede: 'Fotografía tu plato, escribe una frase o dilo en voz alta. Fitty estima calorías y macros, lleva un diario discreto y convierte lo que hay en la nevera en cena.',
    cta: 'Abrir en Telegram',
    secondary: 'Ver la app',
    meta: 'Gratis · Sin instalar · Seis idiomas',
    floatLabel: 'Hoy',
    floatTitle: 'Quedan 997 kcal',
    floatSub: 'Proteína 86 / 144 g',
    floatAi: 'La IA registró 3 comidas',
  },
  pillars: {
    label: 'Por qué Fitty',
    title: 'La nutrición se adapta a tu día, no al revés.',
    items: [
      {
        title: 'Registra en segundos',
        text: 'Una foto, una frase o una nota de voz. La IA reconoce el plato y rellena calorías y macros — solo confirmas.',
      },
      {
        title: 'Objetivos que te siguen',
        text: 'Un plan personal de calorías y macros según tu objetivo, cuerpo y ritmo. Se recalcula cuando cambia tu peso.',
      },
      {
        title: 'Cocina con lo que tienes',
        text: 'Recetas con IA a partir de la nevera, un estante de recetas y porciones al diario con un toque.',
      },
    ],
  },
  screens: {
    label: 'Dentro de la app',
    title: 'Un lugar tranquilo para comer.',
    lead: 'Seis pantallas sin ruido: lo que comiste, lo que queda y qué cocinar después.',
    items: [
      {
        label: 'Resumen',
        title: 'El día de un vistazo',
        text: 'Calorías restantes, macros y comidas. Añade comida o escanea un plato con un toque.',
      },
      {
        label: 'Diario',
        title: 'Cada día, en orden',
        text: 'Del desayuno a la merienda con porciones y calorías. Edita o mueve una entrada.',
      },
      {
        label: 'Añadir comida',
        title: 'Cuatro formas de registrar',
        text: 'Foto, recetas, texto con IA o tu propio plato. Ajusta los gramos y guarda sin salir.',
      },
      {
        label: 'Recetas',
        title: 'Un estante de recetas',
        text: 'Genera una receta, guarda las mejores, busca las tuyas y añade una porción.',
      },
      {
        label: 'Progreso',
        title: 'Tendencias, no presión',
        text: 'Gráfico de peso, calorías medias y días con diario. Sin clasificaciones ni culpa.',
      },
      {
        label: 'Asistente IA',
        title: 'Pregunta — y queda registrado',
        text: 'Di lo que comiste, pide una cena de 500 kcal o una receta con lo que hay.',
      },
    ],
  },
  ai: {
    label: 'Asistente IA',
    title: 'Fotografía. Escribe. Dilo.',
    body: 'Fitty entiende la comida en lenguaje normal. El asistente estima porciones, propone platos según tus calorías restantes y escribe todo en el diario.',
    features: [
      'Reconocimiento por foto con porciones',
      'Entrada por voz en tu idioma',
      'Recetas con lo que hay en la nevera',
      'Registrar y editar en el chat',
    ],
    prompts: ['«Dos huevos y tostada»', '«Cena de menos de 500 kcal»', '«¿Qué cocino con pollo?»'],
    link: 'Probar en Telegram',
  },
  recipes: {
    label: 'Recetas y nevera',
    title: 'La cena probablemente ya está en casa.',
    body: 'Dile a Fitty qué hay en la nevera y obtendrás una receta con calorías y macros. Guárdala, ajusta las porciones y añade lo cocinado a tu día.',
    stats: [
      { value: '1 foto', label: 'hasta la receta' },
      { value: '4 formas', label: 'de registrar una comida' },
      { value: '6', label: 'idiomas' },
    ],
    link: 'Abrir el estante de recetas',
  },
  progress: {
    label: 'Progreso',
    title: 'Los pasos pequeños se ven.',
    body: 'Peso, calorías medias y días con diario — en una vista tranquila. Semana, mes o todo el tiempo, sin presión.',
    chips: ['Gráfico de peso', 'Calorías medias', 'Días con diario', 'Sin clasificación'],
    link: 'Ver tu progreso',
  },
  languages: {
    label: 'Idiomas',
    title: 'Seis idiomas, un diario.',
    lead: 'La Mini App y el bot hablan inglés, ruso, alemán, francés, español y chino. La comida, las recetas y el asistente siguen tu idioma.',
  },
  faq: {
    label: 'FAQ',
    title: 'Bueno saberlo.',
    items: [
      {
        q: '¿Fitty es gratis?',
        a: 'Sí. Abre el bot y empieza — sin instalar ni crear otra cuenta. Diario, objetivos, recetas y asistente IA desde el primer día.',
      },
      {
        q: '¿Hay que instalar una app?',
        a: 'No. Fitty vive dentro de Telegram como Mini App y se abre desde el menú del bot en iOS, Android, escritorio y web.',
      },
      {
        q: '¿Qué tan precisa es la IA?',
        a: 'Las estimaciones por foto y texto son un punto de partida: ajusta gramos y macros antes de guardar. Cuanto más confirmes, más limpio será el diario.',
      },
      {
        q: '¿Qué pasa con mis datos?',
        a: 'El diario y el perfil están en tu cuenta y solo se usan para los cálculos. No se comparten ni aparecen en clasificaciones.',
      },
    ],
  },
  cta: {
    eyebrow: 'Siguiente comida',
    title: 'Empieza por el plato que tienes delante.',
    body: 'Abre Fitty en Telegram, añade tu primera comida y mira cómo queda el día.',
    button: 'Abrir Fitty en Telegram',
  },
  footer: {
    tagline: 'Diario de comida con IA en Telegram',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Ivan Burenin',
  },
  screenKeys: [...SCREEN_KEYS],
}

const ZH: Content = {
  meta: {
    title: 'Fitty — Telegram 里的 AI 饮食日记',
    description:
      '一个安静的 Telegram 饮食日记。拍张照片、描述或直接说出吃了什么，Fitty 会估算热量和营养，推荐食谱，并帮你守住目标。',
    ogLocale: 'zh_CN',
  },
  langLabel: '语言',
  headerCta: '在 Telegram 打开',
  nav: {
    app: '应用',
    ai: 'AI',
    recipes: '食谱',
    languages: '语言',
    faq: '问答',
  },
  hero: {
    eyebrow: 'Telegram 小程序 · 告别表格记录饮食',
    title: '好好吃饭。\n让 *AI* 来算。',
    lede: '拍下餐盘、写一句话，或者直接说出来。Fitty 会估算热量和宏量营养，安静地记下每一天，还能把冰箱里的食材变成晚餐。',
    cta: '在 Telegram 打开',
    secondary: '查看界面',
    meta: '免费开始 · 无需安装 · 六种语言',
    floatLabel: '今天',
    floatTitle: '剩余 997 千卡',
    floatSub: '蛋白质 86 / 144 克',
    floatAi: 'AI 已记录 3 餐',
  },
  pillars: {
    label: '为什么选 Fitty',
    title: '让饮食适应你的一天，而不是反过来。',
    items: [
      {
        title: '几秒完成记录',
        text: '照片、一句话或语音。AI 识别菜肴并填好热量和营养，你只需要确认。',
      },
      {
        title: '会跟着你变的目标',
        text: '根据目标、身体和节奏生成个人热量与营养计划，体重变化时自动重算。',
      },
      {
        title: '用现有食材做饭',
        text: '用冰箱食材生成 AI 食谱，管理收藏，一键把一份加入日记。',
      },
    ],
  },
  screens: {
    label: '应用界面',
    title: '一个安静的吃饭角落。',
    lead: '六个界面，没有噪音：吃了什么、还剩多少、下一顿做什么。',
    items: [
      {
        label: '概览',
        title: '一眼看懂今天',
        text: '剩余热量、营养和餐次。一键添加食物或扫描餐盘。',
      },
      {
        label: '日记',
        title: '每一天，按顺序',
        text: '从早餐到加餐，都有份量和热量。计划变了可以编辑或移动记录。',
      },
      {
        label: '添加食物',
        title: '四种记录方式',
        text: '照片、食谱、AI 文本或自定义菜品。调整克数后直接保存。',
      },
      {
        label: '食谱',
        title: '你的食谱架',
        text: '生成食谱、收藏最好的、搜索自己的，并记录一份。',
      },
      {
        label: '进展',
        title: '看趋势，不施压',
        text: '体重曲线、平均热量和记录天数。没有排行榜，也没有负罪感。',
      },
      {
        label: 'AI 助手',
        title: '一问，就记好了',
        text: '说出吃了什么，要一份 500 千卡的晚餐，或用冰箱食材做菜。',
      },
    ],
  },
  ai: {
    label: 'AI 助手',
    title: '拍一下。打一句。说出来。',
    body: 'Fitty 能理解日常语言里的食物。助手会估算份量，按剩余热量推荐菜肴，并把一切写进日记。',
    features: [
      '照片识别并估算份量',
      '用你的语言语音输入',
      '用冰箱食材生成食谱',
      '在聊天里记录和修改',
    ],
    prompts: ['“两个鸡蛋和吐司”', '“500 千卡以内的晚餐”', '“鸡肉能做什么？”'],
    link: '在 Telegram 试用',
  },
  recipes: {
    label: '食谱与冰箱',
    title: '晚餐很可能就在家里。',
    body: '告诉 Fitty 冰箱里有什么，就能得到带热量和营养的食谱。保存它、调整份量，再把做好的那一份加入今天。',
    stats: [
      { value: '1 张照片', label: '生成完整食谱' },
      { value: '4 种方式', label: '记录一餐' },
      { value: '6', label: '种语言' },
    ],
    link: '打开食谱架',
  },
  progress: {
    label: '进展',
    title: '小小的进步，看得见。',
    body: '体重、平均热量和记录天数，都放在一个安静的界面里。按周、按月或全部时间查看，没有压力。',
    chips: ['体重曲线', '平均热量', '记录天数', '没有排行榜'],
    link: '查看你的进展',
  },
  languages: {
    label: '语言',
    title: '六种语言，一本日记。',
    lead: '小程序和机器人都支持英语、俄语、德语、法语、西班牙语和中文。食物、食谱和助手都会跟随你的语言。',
  },
  faq: {
    label: '问答',
    title: '值得知道。',
    items: [
      {
        q: 'Fitty 免费吗？',
        a: '是的。打开机器人就能开始，无需安装或另建账号。日记、目标、食谱和 AI 助手从第一天起就可用。',
      },
      {
        q: '需要安装应用吗？',
        a: '不需要。Fitty 以 Mini App 的形式住在 Telegram 里，在 iOS、Android、桌面和网页上都能从机器人菜单打开。',
      },
      {
        q: 'AI 有多准确？',
        a: '照片和文字估算只是起点：保存前可以调整克数和营养。你确认得越多，日记就越准确。',
      },
      {
        q: '我的数据怎么处理？',
        a: '日记和资料保存在你的账号里，只用于计算，不会分享给其他用户，也不会出现在排行榜中。',
      },
    ],
  },
  cta: {
    eyebrow: '下一餐',
    title: '从眼前这盘开始。',
    body: '在 Telegram 打开 Fitty，记下第一餐，看看今天的样子。',
    button: '在 Telegram 打开 Fitty',
  },
  footer: {
    tagline: 'Telegram 里的 AI 饮食日记',
    telegram: 'Telegram',
    github: 'GitHub',
    author: 'Ivan Burenin',
  },
  screenKeys: [...SCREEN_KEYS],
}

export const CONTENT: Record<Lang, Content> = {
  en: EN,
  ru: RU,
  de: DE,
  fr: FR,
  es: ES,
  zh: ZH,
}
