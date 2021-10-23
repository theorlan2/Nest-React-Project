import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsItemDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsItemDto) {}
