import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop()
  message_id: number;

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
