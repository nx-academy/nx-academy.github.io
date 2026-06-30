import rss from "@astrojs/rss";

// Flux dédié à la série « Le récap » : uniquement les éditions numérotées
// (« Le récap #N - … »), donc on exclut la page de présentation du format.
export async function GET(context) {
  const modules = Object.values(
    import.meta.glob("../le-recap-*.md", { eager: true }),
  );

  const items = modules
    .filter(
      (module) =>
        !module.frontmatter.draft &&
        module.frontmatter.format === "recap" &&
        /#(\d+)/.test(module.frontmatter.title),
    )
    .map((module) => ({
      title: module.frontmatter.title,
      description: module.frontmatter.description,
      pubDate: new Date(module.frontmatter.publishedDate),
      link: module.url,
    }))
    .sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: "NX Academy — Le récap",
    description:
      "La veille tech mensuelle de NX Academy : chaque mois, l'actu tech triée et commentée. Un mélange d'IA et de curation pour faciliter votre veille.",
    site: context.site,
    items,
    customData: `<language>FR-fr</language>`,
  });
}
