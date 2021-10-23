import { Test, TestingModule } from '@nestjs/testing';
import { NewsTaskService } from './news-task-service';

describe('NewsTaskService', () => {
  let provider: NewsTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsTaskService],
    }).compile();

    provider = module.get<NewsTaskService>(NewsTaskService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
