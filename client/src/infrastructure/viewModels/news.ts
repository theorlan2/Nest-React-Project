import { PostStatusEnum } from "../enums/post";

export interface NewsViewModel {
    title: string;
  author: string;
  url: string;
  created_at: string;
  id_external: string;
  status: PostStatusEnum;
}