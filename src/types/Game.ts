export type GamePlatform = "github" | "steam" | "itch.io"

export type GameStatus = "release" | "in-progress" | "coming-soon"

export type Game = {
  title: string
  description: string
  imgSrc: string
  imgAlt: string
  status: GameStatus
  platforms: GamePlatform[]
  githubUrl: string?
  steamUrl: string?
  itchioUrl: string?
  slug: string
}

