import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NewsService } from './services/news.service';
import { CreateNewsItemDto } from './dtos/create-news.dto';
import ResponseHelper from '../helpers/response.helper';
import { NewsItem } from './shemas/newsItem.shema';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  async create(@Body() createNewsDto: CreateNewsItemDto) {
    const data = await this.newsService.create(createNewsDto);
    if (data)
      return ResponseHelper.success<NewsItem>(data, "Create new Post")

    throw new HttpException('Error', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll() {
    try {
      const data = await this.newsService.findAll();
      return ResponseHelper.success<NewsItem[]>(data, "Get all News")
    } catch (error) {
      throw new HttpException('Error loading data from DB.', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.newsService.findOne(id);
      return ResponseHelper.success<NewsItem>(data, "Get one post")

    } catch (error) {
      throw new HttpException('This item ID no exits.', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.newsService.remove(id)
      return ResponseHelper.success<null>(null, "Success delete")

    } catch (error) {
      throw new HttpException('Error on delete item.', HttpStatus.BAD_REQUEST);
    }

  }
}
