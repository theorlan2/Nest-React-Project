import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import ResponseHelper from '../helpers/response.helper';
import { NewsItemStatusEnum } from './enums/news-status.enum';
import { NewsController } from './news.controller';
import { NewsService } from './services/news.service';
import { NewsItem } from './shemas/newsItem.shema';

describe('NewsController tests', () => {
  let controller: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    function mockNewsItemModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };

      this.findOne = (id: string) => {
        return this.data;
      };

      this.findAll = () => {
        return [this.data];
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

    newsService = module.get<NewsService>(NewsService);
    controller = module.get<NewsController>(NewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(newsService).toBeDefined();
  });

  it('GET findAll', async () => {

    const result = [] as NewsItem[];
    const response = ResponseHelper.success<NewsItem[]>([], "Get all News");
    jest.spyOn(newsService, 'findAll').mockImplementation((): Promise<NewsItem[]> => Promise.resolve(result));

    expect(await controller.findAll()).toStrictEqual(response);

  });


  it('GET findOne', async () => {

    const result = await newsService.create({
      id_external:'12345',
      title:'Test of new',
      author:'Dany',
      status: NewsItemStatusEnum.ENABLE,
      url:'',
      created_at:''
    });
 
    const response = ResponseHelper.success<NewsItem>(result, "Get one post");
    jest.spyOn(newsService, 'findOne').mockImplementation((): Promise<NewsItem> => Promise.resolve(result));

    expect(await controller.findOne('123')).toStrictEqual(response);

  });


});
