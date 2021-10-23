import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service'; 
import { NewsController } from './news.controller';
import { NewsItem, NewSchema } from './shemas/news.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsTaskService } from './services/news-task-service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: NewsItem.name, schema: NewSchema }],
    ),
    HttpModule
  ], 
  controllers: [NewsController],
  providers: [NewsService, NewsTaskService],
})
export class NewsModule {}
