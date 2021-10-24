import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { NewsService } from './services/news.service';
import { CreateNewsItemDto } from './dtos/create-news.dto'; 

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
   async create(@Body() createNewsDto: CreateNewsItemDto) {
    const result = await this.newsService.create(createNewsDto);
    return result;
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
