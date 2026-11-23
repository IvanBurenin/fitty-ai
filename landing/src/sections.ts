import type { Lang } from './content'

export type HowStep = { title: string; text: string }

export const HOW: Record<
  Lang,
  { label: string; title: string; lead: string; steps: HowStep[]; cta: string }
> = {
  en: {
    label: 'How it works',
    title: 'Three steps. No spreadsheets.',
    lead: 'The whole loop fits into a few seconds — and nothing is saved until you confirm.',
    steps: [
      {
        title: 'Snap or describe',
        text: 'A photo, a sentence, or a voice note. No searching through tables.',
      },
      {
        title: 'Check the estimate',
        text: 'Portion, grams, calories and macros. Edit anything before saving.',
      },
      {
        title: 'Confirm',
        text: 'Only what you approve goes into your diary.',
      },
    ],
    cta: 'Try it in Telegram',
  },
  ru: {
    label: 'Как это работает',
    title: 'Три шага. Без таблиц.',
    lead: 'Весь цикл занимает несколько секунд — и ничего не сохраняется без вашего подтверждения.',
    steps: [
      {
        title: 'Сфотографируйте или опишите',
        text: 'Фото, фраза или голосовое. Без поиска по таблицам.',
      },
      {
        title: 'Проверьте оценку',
        text: 'Порция, граммы, калории и БЖУ. Всё можно поправить.',
      },
      {
        title: 'Подтвердите',
        text: 'В дневник попадает только то, что вы одобрили.',
      },
    ],
    cta: 'Попробовать в Telegram',
  },
  de: {
    label: 'So funktioniert es',
    title: 'Drei Schritte. Keine Tabellen.',
    lead: 'Der ganze Ablauf dauert Sekunden — und nichts wird ohne deine Bestätigung gespeichert.',
    steps: [
      {
        title: 'Fotografieren oder beschreiben',
        text: 'Foto, Satz oder Sprachnachricht. Kein Suchen in Tabellen.',
      },
      {
        title: 'Schätzung prüfen',
        text: 'Portion, Gramm, Kalorien und Makros. Alles vor dem Speichern änderbar.',
      },
      {
        title: 'Bestätigen',
        text: 'Nur was du bestätigst, landet in deinem Tagebuch.',
      },
    ],
    cta: 'In Telegram ausprobieren',
  },
  fr: {
    label: 'Comment ça marche',
    title: 'Trois étapes. Sans tableur.',
    lead: 'Tout le cycle tient en quelques secondes — et rien n’est enregistré sans votre confirmation.',
    steps: [
      {
        title: 'Photographiez ou décrivez',
        text: 'Une photo, une phrase ou un message vocal. Sans chercher dans des tableaux.',
      },
      {
        title: 'Vérifiez l’estimation',
        text: 'Portion, grammes, calories et macros. Tout est modifiable avant l’enregistrement.',
      },
      {
        title: 'Confirmez',
        text: 'Seul ce que vous validez entre dans votre journal.',
      },
    ],
    cta: 'Essayer dans Telegram',
  },
  es: {
    label: 'Cómo funciona',
    title: 'Tres pasos. Sin hojas de cálculo.',
    lead: 'Todo el ciclo cabe en unos segundos — y nada se guarda hasta que lo confirmes.',
    steps: [
      {
        title: 'Fotografía o describe',
        text: 'Una foto, una frase o una nota de voz. Sin buscar en tablas.',
      },
      {
        title: 'Revisa la estimación',
        text: 'Porción, gramos, calorías y macros. Todo editable antes de guardar.',
      },
      {
        title: 'Confirma',
        text: 'Solo lo que apruebas entra en tu diario.',
      },
    ],
    cta: 'Probar en Telegram',
  },
  zh: {
    label: '如何使用',
    title: '三个步骤。不用表格。',
    lead: '整个流程只需几秒——确认之前不会保存任何内容。',
    steps: [
      {
        title: '拍照或描述',
        text: '照片、一句话或语音。不用翻表格。',
      },
      {
        title: '检查估算',
        text: '份量、克数、热量和营养。保存前都可以修改。',
      },
      {
        title: '确认',
        text: '只有你确认的内容才会进入日记。',
      },
    ],
    cta: '在 Telegram 试用',
  },
}

export type StudioProject = {
  name: string
  role: string
  href: string
  icon: 'espada' | 'tracky' | 'yoggy' | 'fitty'
}

export const STUDIO: Record<
  Lang,
  {
    label: string
    tagline: string
    title: string
    projectsLabel: string
    stats: { value: string; label: string }[]
    projects: StudioProject[]
    youtubeLabel: string
    youtubeHandle: string
    githubLabel: string
  }
> = {
  en: {
    label: 'Studio',
    tagline: 'The team behind Fitty and Espada Sports projects',
    title: 'ESPADA SPORTS talks football on YouTube. Fitty keeps your food diary.',
    projectsLabel: 'Projects',
    stats: [
      { value: '4.4k', label: 'YouTube subscribers' },
      { value: '6M', label: 'video views' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: 'Football channel', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: 'Training diary', href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: 'Yoga & mindfulness', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'AI food diary', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
  ru: {
    label: 'Студия',
    tagline: 'Команда, которая делает Fitty и проекты Espada Sports',
    title: 'ESPADA SPORTS рассказывает о футболе на YouTube. Fitty ведёт дневник питания.',
    projectsLabel: 'Проекты',
    stats: [
      { value: '4,4 тыс.', label: 'подписчиков на YouTube' },
      { value: '6 млн', label: 'просмотров видео' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: 'Футбольный канал', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: 'Дневник тренировок', href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: 'Йога и осознанность', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'Дневник питания с ИИ', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
  de: {
    label: 'Studio',
    tagline: 'Das Team hinter Fitty und den Espada-Sports-Projekten',
    title: 'ESPADA SPORTS spricht auf YouTube über Fußball. Fitty führt dein Ernährungstagebuch.',
    projectsLabel: 'Projekte',
    stats: [
      { value: '4,4 Tsd.', label: 'YouTube-Abonnenten' },
      { value: '6 Mio.', label: 'Videoaufrufe' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: 'Fußballkanal', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: 'Trainingstagebuch', href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: 'Yoga & Achtsamkeit', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'KI-Ernährungstagebuch', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
  fr: {
    label: 'Studio',
    tagline: "L'équipe derrière Fitty et les projets Espada Sports",
    title: 'ESPADA SPORTS parle football sur YouTube. Fitty tient votre journal alimentaire.',
    projectsLabel: 'Projets',
    stats: [
      { value: '4,4 k', label: 'abonnés YouTube' },
      { value: '6 M', label: 'vues vidéo' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: 'Chaîne football', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: "Journal d'entraînement", href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: 'Yoga & pleine conscience', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'Journal alimentaire IA', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
  es: {
    label: 'Estudio',
    tagline: 'El equipo detrás de Fitty y los proyectos de Espada Sports',
    title: 'ESPADA SPORTS habla de fútbol en YouTube. Fitty lleva tu diario de comida.',
    projectsLabel: 'Proyectos',
    stats: [
      { value: '4,4 mil', label: 'suscriptores de YouTube' },
      { value: '6 M', label: 'visualizaciones' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: 'Canal de fútbol', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: 'Diario de entrenamiento', href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: 'Yoga y mindfulness', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'Diario de comida con IA', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
  zh: {
    label: '工作室',
    tagline: '打造 Fitty 与 Espada Sports 项目的团队',
    title: 'ESPADA SPORTS 在 YouTube 聊足球，Fitty 记录你的饮食。',
    projectsLabel: '项目',
    stats: [
      { value: '4.4k', label: 'YouTube 订阅者' },
      { value: '6M', label: '视频播放' },
    ],
    projects: [
      { name: 'ESPADA SPORTS', role: '足球频道', href: 'https://www.youtube.com/@espadasportsru', icon: 'espada' },
      { name: 'Tracky', role: '训练日记', href: 'https://t.me/AiTrackyBot', icon: 'tracky' },
      { name: 'Yoggy', role: '瑜伽与正念', href: 'https://t.me/AiYoggyBot', icon: 'yoggy' },
      { name: 'Fitty', role: 'AI 饮食日记', href: 'https://t.me/AiFittyBot', icon: 'fitty' },
    ],
    youtubeLabel: 'YouTube',
    youtubeHandle: '@espadasportsru',
    githubLabel: 'GitHub',
  },
}

export const GALLERY_UI: Record<
  Lang,
  { view: string; close: string; prev: string; next: string; hint: string }
> = {
  en: {
    view: 'Open full screen',
    close: 'Close',
    prev: 'Previous screen',
    next: 'Next screen',
    hint: 'Select a screen to inspect it',
  },
  ru: {
    view: 'Открыть экран',
    close: 'Закрыть',
    prev: 'Предыдущий экран',
    next: 'Следующий экран',
    hint: 'Выберите экран, чтобы рассмотреть',
  },
  de: {
    view: 'Vollbild öffnen',
    close: 'Schließen',
    prev: 'Vorheriger Bildschirm',
    next: 'Nächster Bildschirm',
    hint: 'Bildschirm auswählen und ansehen',
  },
  fr: {
    view: 'Ouvrir en plein écran',
    close: 'Fermer',
    prev: 'Écran précédent',
    next: 'Écran suivant',
    hint: 'Choisissez un écran à examiner',
  },
  es: {
    view: 'Abrir pantalla completa',
    close: 'Cerrar',
    prev: 'Pantalla anterior',
    next: 'Pantalla siguiente',
    hint: 'Elige una pantalla para verla',
  },
  zh: {
    view: '全屏查看',
    close: '关闭',
    prev: '上一个界面',
    next: '下一个界面',
    hint: '选择一个界面查看',
  },
}

export const TRUST: Record<
  Lang,
  {
    label: string
    title: string
    body: string
    version: string
    privacy: string
    terms: string
    contact: string
    github: string
  }
> = {
  en: {
    label: 'About',
    title: 'Built by one developer, not a growth team.',
    body: 'Fitty is made and maintained by Ivan Burenin. No ads, no data selling, no fake reviews. If something breaks, open an issue on GitHub.',
    version: 'v0.1 · updated November 2026',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    github: 'GitHub showcase',
  },
  ru: {
    label: 'О проекте',
    title: 'Сделано одним разработчиком, а не отделом маркетинга.',
    body: 'Fitty делает и поддерживает Иван Буренин. Без рекламы, продажи данных и фейковых отзывов. Если что-то сломалось — откройте issue на GitHub.',
    version: 'v0.1 · обновлено в ноябре 2026',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    contact: 'Связаться',
    github: 'Витрина на GitHub',
  },
  de: {
    label: 'Über das Projekt',
    title: 'Von einem Entwickler gebaut, nicht von einem Growth-Team.',
    body: 'Fitty wird von Ivan Burenin entwickelt und gepflegt. Keine Werbung, kein Datenverkauf, keine erfundenen Bewertungen. Wenn etwas nicht funktioniert, öffne ein Issue auf GitHub.',
    version: 'v0.1 · aktualisiert im November 2026',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    contact: 'Kontakt',
    github: 'GitHub-Showcase',
  },
  fr: {
    label: 'À propos',
    title: 'Développé par une personne, pas par une équipe marketing.',
    body: 'Fitty est créé et maintenu par Ivan Burenin. Sans publicité, sans vente de données et sans faux avis. Si quelque chose ne fonctionne pas, ouvrez un ticket sur GitHub.',
    version: 'v0.1 · mis à jour en novembre 2026',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact',
    github: 'Vitrine GitHub',
  },
  es: {
    label: 'Sobre el proyecto',
    title: 'Hecho por un desarrollador, no por un equipo de marketing.',
    body: 'Fitty lo crea y mantiene Ivan Burenin. Sin anuncios, sin venta de datos y sin reseñas falsas. Si algo falla, abre un issue en GitHub.',
    version: 'v0.1 · actualizado en noviembre de 2026',
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',
    github: 'Vitrina en GitHub',
  },
  zh: {
    label: '关于',
    title: '由一个开发者打造，而不是增长团队。',
    body: 'Fitty 由 Ivan Burenin 开发和维护。没有广告，不出售数据，也没有虚假评价。如果遇到问题，请在 GitHub 提交 issue。',
    version: 'v0.1 · 2026 年 11 月更新',
    privacy: '隐私',
    terms: '条款',
    contact: '联系',
    github: 'GitHub 展示',
  },
}

export const MID_CTA: Record<Lang, { title: string; body: string; button: string }> = {
  en: {
    title: 'Your next meal deserves a calmer diary.',
    body: 'Open Fitty in Telegram and log it in a few seconds.',
    button: 'Open @AiFittyBot',
  },
  ru: {
    title: 'Следующий приём пищи заслуживает спокойного дневника.',
    body: 'Откройте Fitty в Telegram и запишите его за несколько секунд.',
    button: 'Открыть @AiFittyBot',
  },
  de: {
    title: 'Deine nächste Mahlzeit verdient ein ruhigeres Tagebuch.',
    body: 'Öffne Fitty in Telegram und erfasse sie in wenigen Sekunden.',
    button: '@AiFittyBot öffnen',
  },
  fr: {
    title: 'Votre prochain repas mérite un journal plus tranquille.',
    body: 'Ouvrez Fitty dans Telegram et notez-le en quelques secondes.',
    button: 'Ouvrir @AiFittyBot',
  },
  es: {
    title: 'Tu próxima comida merece un diario más tranquilo.',
    body: 'Abre Fitty en Telegram y regístrala en unos segundos.',
    button: 'Abrir @AiFittyBot',
  },
  zh: {
    title: '下一餐，值得一个更安静的日记。',
    body: '在 Telegram 打开 Fitty，几秒就能记录。',
    button: '打开 @AiFittyBot',
  },
}
