export const articles = [
  {
    path: "/kolko-obazhdaniya-propuska-biznesat/",
    title: "Колко обаждания пропуска средният бизнес в България?",
    description:
      "Няма официална средна стойност за България. Вижте как да измерите пропуснатите обаждания, да изчислите реалния им брой и да оцените загубените възможности.",
    answer:
      "Няма надеждна публична статистика колко обаждания пропуска средният бизнес в България. Точният брой зависи от входящия трафик, работното време, натоварването и начина на маршрутизиране. Практичният отговор се получава от телефонния отчет: разделете неотговорените входящи обаждания на всички входящи обаждания и анализирайте резултата поне за четири седмици.",
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
