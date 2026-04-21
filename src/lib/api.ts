import type {
  HomeResponse,
  BatchResponse,
  ScheduleResponse,
  GenreResponse,
  SearchResponse,
  DetailResponse,
  WatchResponse,
} from "@/lib/types"

const BASE_URL = process.env.ANIMEKOMPI_BASE_URL!
const TOKEN = process.env.ANIMEKOMPI_TOKEN!

// ─── Core fetcher ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate: 300 }, // cache 5 minutes
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`)
  }

  return res.json() as Promise<T>
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export async function getHome(page = 1): Promise<HomeResponse> {
  return apiFetch<HomeResponse>("/home", { page: String(page) })
}

export async function getBatch(page = 1): Promise<BatchResponse> {
  return apiFetch<BatchResponse>("/batch", { page: String(page) })
}

export async function getSchedule(): Promise<ScheduleResponse> {
  return apiFetch<ScheduleResponse>("/schedule")
}

export async function getGenre(name: string, page = 1): Promise<GenreResponse> {
  return apiFetch<GenreResponse>("/genres", { name, page: String(page) })
}

export async function searchAnime(q: string, page = 1): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("/search", { q, page: String(page) })
}

export async function getAnimeDetail(slug: string): Promise<DetailResponse> {
  return apiFetch<DetailResponse>("/detail", { slug })
}

export async function getWatchData(slug: string): Promise<WatchResponse> {
  return apiFetch<WatchResponse>("/watch", { slug })
}