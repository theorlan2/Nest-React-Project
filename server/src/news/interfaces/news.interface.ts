import { Document } from 'mongoose';
import { NewsItemStatusEnum } from '../enums/news-status.enum';

export interface News extends Document {
  readonly title: string;
  readonly author: string;
  readonly url: string;
  readonly create_at: string;
  readonly status: NewsItemStatusEnum;
}
