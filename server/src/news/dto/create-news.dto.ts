import { NewsItemStatusEnum } from '../enums/news-status.enum';
import { NewsExternal } from '../interfaces/news-externals.interface';

export class CreateNewsItemDto {
  readonly title: string;
  readonly author: string;
  readonly url: string;
  readonly created_at: string;
  readonly id_external: string;
  readonly status: NewsItemStatusEnum;

  constructor(data: NewsExternal) {
    this.id_external = data.story_id;
    this.title = data.story_title || data.title || '';
    this.url = data.story_url || data.url || '';
    this.author = data.author;
    this.created_at = data.created_at;
    this.status = NewsItemStatusEnum.ENABLE;
  }
}
