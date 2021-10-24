import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateNewsItemDto } from '../dtos/create-news.dto';
import { NewsItemStatusEnum } from '../enums/news-status.enum';
import {
  HistsNewsExternal,
  NewsExternal
} from '../interfaces/news-externals.interface';
import { NewsItem } from '../shemas/newsItem.shema';

@Injectable()
export class NewsService  {
  constructor(
    @InjectModel(NewsItem.name)
    private newsItemModel: Model<NewsItem>,
    private httpService: HttpService,
  ) {}


  async create(createNewsDto: CreateNewsItemDto): Promise<NewsItem> {
    const createdNews = new this.newsItemModel(createNewsDto);
    return createdNews.save();
  }

  async createMany(createNewsDto: CreateNewsItemDto[]): Promise<NewsItem[]> {
    const createManyNews = await this.newsItemModel.insertMany(createNewsDto);
    return createManyNews;
  }

  findAll() {
    return this.newsItemModel
      .find({ status: NewsItemStatusEnum.ENABLE })
      .sort({ created_at: -1 })
      .exec();
  }

  findOne(id: string) {
    const findNews = this.newsItemModel.findById(id);
    return findNews;
  }

  findLastItemByDate(callback: (item: NewsItem) => void) {
    this.newsItemModel
      .findOne({}, {}, { sort: { created_at: -1 } }, function (err, post) {
        if (callback && typeof callback == 'function') {
          callback(post);
        }
      })
      .catch((_err) => {});
  }

  async fetchData() {
    let lastPost = {} as NewsItem;
    this.findLastItemByDate((post: NewsItem) => {
      lastPost = post;
    });

    const result = (await firstValueFrom(
      this.httpService.get(
        'https://hn.algolia.com/api/v1/search_by_date?query=nodejs',
      ),
    ).catch((err) => {
      console.log('Error on request',err.response.status, err.response.statusText)
    })) as AxiosResponse<HistsNewsExternal>;

    result && result?.data && result?.data?.hits.map(async (item: NewsExternal) => {
      const data = new CreateNewsItemDto(item);
      if ((lastPost && item.created_at > lastPost.created_at) || !lastPost) {
        await this.newsItemModel.create(data);
      }
    });
  }

  async remove(id: string) {
    await this.newsItemModel.updateOne(
      { _id: id },
      { status: NewsItemStatusEnum.DISABLED },
    );
    return;
  }
}
