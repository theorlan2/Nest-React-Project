export interface HistsNewsExternal {
  hits: NewsExternal[];
}

export interface NewsExternal {
  readonly story_id: string;
  readonly title?: string;
  readonly author: string;
  readonly story_title?: string;
  readonly story_url?: string;
  readonly url?: string;
  readonly created_at: string;
}
