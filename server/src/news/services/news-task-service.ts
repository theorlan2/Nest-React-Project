import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewsService } from './news.service';

@Injectable()
export class NewsTaskService {
  constructor( private  newsService: NewsService) {} 

  //@Cron('10 * * * * *') // for test
  @Cron('0 0 * * * *')
  handleCron() {
    this.newsService.fetchData(); 
  }
}