import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NewsItemStatusEnum } from '../enums/news-status.enum'; 

@Schema()
export class NewsItem extends Document {
  
  @Prop()
  id_external: string;
  
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  url: string;

  @Prop()
  created_at: string;

  @Prop()
  status: NewsItemStatusEnum;
}

export const NewSchema = SchemaFactory.createForClass(NewsItem);
