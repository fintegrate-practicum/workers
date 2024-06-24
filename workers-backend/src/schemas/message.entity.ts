import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';
import { AppModule } from 'src/app.module';

@Schema({ timestamps: true })
export class Message extends Document {

  @Prop()
  business_id: string;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  sender_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  receiver_id: Types.ObjectId;

  @Prop()
  message_content: string;

  @Prop()
  date_time: Date;

  @Prop()
  read_status: boolean;

  @Prop()
  status: string;
}
 
export const MessageSchema = SchemaFactory.createForClass(Message);
 