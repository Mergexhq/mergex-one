export function getInsightBySlug(slug: string) {
  return { slug, title: slug.replace(/-/g, ' ') };
}

export function getAllSlugs() {
  return ['diagnose-before-you-build'];
}
