export type VideoKind = "devlog" | "ice-breaker" | "going-further"

export type Video = {
    title: string
    description: string
    vimeoId: string
    kind: VideoKind
    publishedDate: string
    slug: string
    imgSrc: string
    imgAlt: string
    relatedGameSlug?: string
    relatedCourseSlug?: string
}
