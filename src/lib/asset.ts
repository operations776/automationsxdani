/* Resolves a public/ asset against the Vite base path so it works
   both in local dev and on GitHub Pages project hosting. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
