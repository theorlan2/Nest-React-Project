import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { NewsService } from './news.service';

@Injectable()
export class NewsTaskService {
  constructor(private newsService: NewsService) {}

  @Cron('0 0 * * * *')
  handleCron() {
    this.newsService.fetchData();
  }

  // Call first execution
  @Timeout(5000)
  handleTimeOut(): void {
    this.newsService.fetchData();
  }
}
