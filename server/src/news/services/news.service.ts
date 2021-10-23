import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateNewsItemDto } from '../dto/create-news.dto';
import { NewsItemStatusEnum } from '../enums/news-status.enum';
import {
  HistsNewsExternal,
  NewsExternal,
} from '../interfaces/news-externals.interface';
import { NewsItem as News, NewsDocument } from '../shemas/news.shema';

@Injectable()
export class NewsService implements OnModuleInit  {
  constructor(
    @InjectModel(News.name) private newsModel: Model<NewsDocument>,
    private httpService: HttpService,
  ) {}

  onModuleInit() {
    console.log(`The module has been initialized.`);
    this.fetchData();
  }

  async create(createNewsDto: CreateNewsItemDto): Promise<News> {
    const createdNews = new this.newsModel(createNewsDto);
    return createdNews.save();
  }

  async createMany(createNewsDto: CreateNewsItemDto[]): Promise<News[]> {
    const createManyNews = await this.newsModel.insertMany(createNewsDto);
    return createManyNews;
  }

  findAll() {
    return this.newsModel
      .find({ status: NewsItemStatusEnum.ENABLE })
      .sort({ created_at: -1 })
      .exec();
  }

  findOne(id: string) {
    const findNews = this.newsModel.findById(id);
    return findNews;
  }

  findLastItemByDate(callback: (item: NewsDocument) => void) {
    this.newsModel
      .findOne({}, {}, { sort: { created_at: -1 } }, function (err, post) {
        if (callback && typeof callback == 'function') {
          callback(post);
        }
      })
      .catch((_err) => {});
  }

  async fetchData() {
    let lastPost = {} as NewsDocument;
    this.findLastItemByDate((post: NewsDocument) => {
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
        await this.newsModel.create(data);
      }
    });
  }

  async remove(id: string) {
    await this.newsModel.updateOne(
      { _id: id },
      { status: NewsItemStatusEnum.DISABLED },
    );
    return;
  }
}
