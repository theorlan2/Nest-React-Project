import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './services/news.service';
import { NewsItem } from './shemas/newsItem.shema';

describe('NewsController', () => {
  let controller: NewsController;

  beforeEach(async () => {
    function mockNewsItemModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };

      this.find = (id: string) => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [NewsController],
      providers: [
        NewsService,
        {
          provide: getModelToken(NewsItem.name),
          useValue: mockNewsItemModel,
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
