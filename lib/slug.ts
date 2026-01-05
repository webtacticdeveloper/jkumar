// lib/slug.ts
import slugify from 'slugify'
export const toSlug = (s: string) => slugify(s, { lower: true, strict: true })
export const catPath = (catSlug: string) => `/investor-corner/${catSlug}`
export const subPath = (catSlug: string, subSlug: string) =>
  `/investor-corner/${catSlug}/${subSlug}`
