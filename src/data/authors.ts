import { site } from "./site";

export const authors = [site.author, site.coFounder] as const;

export type Author = (typeof authors)[number];

export const authorPath = (slug: string) => `/avtori/${slug}/`;

export const getAuthor = (slug: string) => authors.find((author) => author.slug === slug);
