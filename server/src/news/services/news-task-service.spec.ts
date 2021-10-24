import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsItem } from '../shemas/newsItem.shema';
import { NewsTaskService } from './news-task-service';
import { NewsService } from './news.service';

describe('NewsTaskService', () => {
  let provider: NewsTaskService;

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
      imports:[HttpModule],
      providers: [NewsService,NewsTaskService,
        {
          provide: getModelToken(NewsItem.name),
          useValue: mockNewsItemModel,
        }],
    }).compile();

    provider = module.get<NewsTaskService>(NewsTaskService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
