export const titleCase = (str: string): string =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
