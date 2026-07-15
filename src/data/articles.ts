export const articles = [
  {
    path: "/kolko-obazhdaniya-propuska-biznesat/",
    title: "Колко обаждания пропуска средният бизнес?",
    description:
      "По данни на Invoca 27% от обажданията към анализирани компании за домашни услуги остават без отговор. Вижте как да измерите собствения си процент и реалната цена на пропуснатите разговори.",
    answer:
      "По данни на Invoca 27% от обажданията към анализирани home-services компании в САЩ остават без отговор. Това е реален индустриален ориентир, а не универсална стойност за всеки бизнес. Собственият процент се изчислява от телефонния отчет: неотговорени входящи обаждания, разделени на всички входящи обаждания за същия период.",
    eyebrow: "Пропуснати обаждания",
    image: "/assets/articles/propusnati-obazhdaniya/propusnati-obazhdaniya-featured-v1.webp",
    imageAlt: "Входящи бизнес обаждания, част от които остават неотговорени",
    authorSlug: "dean-dechev",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
  },
  {
    path: "/kakvo-e-ai-retseptsionist/",
    title: "Какво е AI рецепционист?",
    description:
      "Какво е AI рецепционист, как отговаря на обаждания и записва часове, къде помага и кога трябва да прехвърли разговора към човек.",
    answer:
      "AI (изкуствен интелект) рецепционист е гласов софтуер, който отговаря на входящи обаждания, задава въпроси и изпълнява предварително разрешени задачи. Той може да записва часове, да приема съобщения и да прехвърля сложни случаи към човек. Vdiga е AI рецепционист на български език, създаден за тези повтаряеми разговори.",
    eyebrow: "AI рецепционист",
    image: "/assets/articles/ai-retseptsionist/call-to-action-og-v1.jpg",
    imageAlt: "AI рецепционист обработва входящо обаждане и го превръща в конкретно действие за бизнеса",
    authorSlug: "dean-dechev",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
  },
] as const;

export type Article = (typeof articles)[number];

export const articlesByAuthor = (authorSlug: string) =>
  articles
    .filter((article) => article.authorSlug === authorSlug)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
