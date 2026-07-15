export const articles = [
  {
    path: "/kakvo-e-ai-retseptsionist/",
    title: "Какво е AI рецепционист?",
    description:
      "Какво е AI рецепционист, как отговаря на обаждания и записва часове, къде помага и кога трябва да прехвърли разговора към човек.",
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
