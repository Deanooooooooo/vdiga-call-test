export type ContentPageType = "core" | "niche" | "question" | "comparison" | "data";

export interface ContentPage {
  path: string;
  label: string;
  title: string;
  description: string;
  primaryKeyword: string;
  targetQuery: string;
  priority: "P1" | "P2" | "P3";
  type: ContentPageType;
  published: boolean;
  datePublished: string;
  dateModified: string;
}

export const contentPages: ContentPage[] = [
  {
    path: "/",
    label: "Начало",
    title: "AI рецепционист — обаждания и часове | Vdiga",
    description: "Vdiga е AI рецепционист на български. Вдига телефона, записва часове и праща обобщение след разговора.",
    primaryKeyword: "AI рецепционист",
    targetQuery: "AI рецепционист България",
    priority: "P1",
    type: "core",
    published: true,
    datePublished: "2026-07-03",
    dateModified: "2026-07-05",
  },
  {
    path: "/tseni",
    label: "Цени",
    title: "AI рецепционист цена — от 75 евро | Vdiga",
    description: "AI рецепционист цена: 75, 150 или 200-250 евро/месец без ДДС. Вижте кой план пасва на обажданията ви.",
    primaryKeyword: "AI рецепционист цена",
    targetQuery: "колко струва AI рецепционист в България",
    priority: "P1",
    type: "core",
    published: true,
    datePublished: "2026-07-03",
    dateModified: "2026-07-05",
  },
  {
    path: "/demo",
    label: "Демо",
    title: "AI рецепционист демо — чуйте разговор | Vdiga",
    description: "Чуйте AI рецепционист демо на български. Вижте как трябва да започва разговорът и кога човек поема сложния случай.",
    primaryKeyword: "AI рецепционист демо",
    targetQuery: "мога ли да чуя AI рецепционист на български",
    priority: "P1",
    type: "core",
    published: true,
    datePublished: "2026-07-03",
    dateModified: "2026-07-05",
  },
  {
    path: "/kak-raboti",
    label: "Как работи",
    title: "Как работи AI рецепционист — Vdiga",
    description: "Как работи AI рецепционист: Vdiga вдига, пита, проверява календар, записва час и праща обобщение след разговора.",
    primaryKeyword: "как работи AI рецепционист",
    targetQuery: "как работи AI телефонен асистент",
    priority: "P1",
    type: "core",
    published: true,
    datePublished: "2026-07-03",
    dateModified: "2026-07-05",
  },
  {
    path: "/za-nas",
    label: "За нас",
    title: "За нас — Vdiga by Blast Off EOOD",
    description: "Кой стои зад Vdiga: AI рецепционист на български, разработван под Blast Off EOOD, София.",
    primaryKeyword: "Vdiga",
    targetQuery: "кой стои зад Vdiga",
    priority: "P1",
    type: "core",
    published: true,
    datePublished: "2026-07-03",
    dateModified: "2026-07-05",
  },
  {
    path: "/ai-retseptsionist-dentalna-klinika",
    label: "Дентални клиники",
    title: "AI рецепционист за дентална клиника | Vdiga",
    description: "AI рецепционист за дентална клиника: Vdiga вдига, пита за спешност, проверява календара и записва пациенти.",
    primaryKeyword: "AI рецепционист за дентална клиника",
    targetQuery: "AI рецепционист за зъболекар / дентална клиника",
    priority: "P1",
    type: "niche",
    published: true,
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
  },
  {
    path: "/ai-retseptsionist-meditsinski-tsentar",
    label: "Медицински център",
    title: "AI рецепционист за медицински център | Vdiga",
    description: "AI рецепционист за медицински център: входящи обаждания, прегледи, правила и пренасочване.",
    primaryKeyword: "AI рецепционист за медицински център",
    targetQuery: "AI асистент за медицински център",
    priority: "P1",
    type: "niche",
    published: false,
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
  },
  {
    path: "/ai-retseptsionist-salon-za-krasota",
    label: "Салон за красота",
    title: "AI рецепционист за салон за красота | Vdiga",
    description: "AI рецепционист за салон за красота: записване на часове, SMS потвърждение и обобщение.",
    primaryKeyword: "AI рецепционист за салон за красота",
    targetQuery: "AI за записване на часове салон",
    priority: "P1",
    type: "niche",
    published: false,
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
  },
];

export const publishedPages = contentPages.filter((page) => page.published);
export const navPages = publishedPages.filter((page) => page.type === "core");
export const contentPageByPath = Object.fromEntries(contentPages.map((page) => [page.path, page]));
