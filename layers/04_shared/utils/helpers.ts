export const titleCase = (str: string): string =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const slugify = (str: string): string =>
  str.toLowerCase().replace(/ /g, '-');

export const getTitleFromSlug = (slug: string): string =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
