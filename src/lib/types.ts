export interface AnimeListItem {
  slug: string
  title: string
  thumbnail: string
  type: string
  latest_episode: string
}

export interface HomeResponse {
  status: string
  data: {
    page: number
    total_pages: number
    anime: AnimeListItem[]
  }
}

export interface BatchAnimeItem {
  slug: string
  id: string
  title: string
  image: string
  status: string
  type: string
  latest_episode: string
}

export interface BatchResponse {
  status: string
  data: {
    page: number
    total_pages: number
    anime: BatchAnimeItem[]
  }
}

export interface ScheduleItem {
  slug: string
  title: string
  thumbnail: string
  episode: string
  release_time?: string
}

export interface ScheduleResponse {
  status: string
  data: Record<string, ScheduleItem[]>
}

export interface GenreResponse {
  status: string
  data: {
    page: number
    total_pages: number
    anime: AnimeListItem[]
    genre: string
  }
}

export interface SearchResponse {
  status: string
  data: {
    page: number
    total_pages: number
    anime: AnimeListItem[]
    query: string
  }
}

export interface EpisodeItem {
  slug: string
  number: string
  title: string
  date: string
}

export interface AnimeDetail {
  title: string
  thumbnail: string
  synopsis: string
  info: {
    status: string
    studio: string
    dirilis: string
    durasi: string
    season: string
    tipe: string
    total_episode: string
    fansub: string
    censor: string
    director: string
    producers: string
    diposting_oleh: string
    diperbarui_pada: string
    genres: string[]
  }
  episodes: EpisodeItem[]
}

export interface DetailResponse {
  status: string
  data: AnimeDetail
}

export interface StreamingServer {
  name: string
  type: string
  url: string
}

export interface DownloadLink {
  provider: string
  url: string
}

export interface DownloadQuality {
  quality: string
  links: DownloadLink[]
}

export interface WatchData {
  title: string
  streaming_servers: StreamingServer[]
  download_links: DownloadQuality[]
  prev_episode: string | null
  next_episode: string | null
}

export interface WatchResponse {
  status: string
  data: WatchData
}
