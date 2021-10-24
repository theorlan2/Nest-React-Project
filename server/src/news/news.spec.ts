import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsTaskService } from './services/news-task-service';
import { NewsService } from './services/news.service';
import { NewsItem } from './shemas/newsItem.shema';

describe('News Module', () => {
  let provider: NewsService;
  let providerTask: NewsTaskService;

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

    provider = module.get<NewsService>(NewsService);
    providerTask = module.get<NewsTaskService>(NewsTaskService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
    expect(providerTask).toBeDefined();
  });
});
