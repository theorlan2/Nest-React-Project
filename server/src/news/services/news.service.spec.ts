import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

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
      providers: [
        NewsService,
        {
          provide: getModelToken('NewsItem'),
          useValue: mockNewsItemModel,
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
