import rss, { pagesGlobToRssItems } from "@astrojs/rss"

export async function GET(context) {
    return rss({
        title: "NX Academy",
        description: "Avec NX Academy, suivez gratuitement des cours en ligne et améliorez vos compétences en programmation et devops. Aucun compte n'est requis.",
        site: context.site,
        items: await pagesGlobToRssItems(
            import.meta.glob("./{articles,fiches}/*.md")
        ),
        customData: `<language>FR-fr</language>`
    })
}
