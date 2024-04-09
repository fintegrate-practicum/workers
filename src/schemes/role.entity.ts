import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  active: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
