import { Test, TestingModule } from '@nestjs/testing';
import { News } from './services/news.service';

describe('News', () => {
  let provider: News;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [News],
    }).compile();

    provider = module.get<News>(News);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
