import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop()
  id: string;

  @Prop()
  registeredAt: Date;

  @Prop()
  lastLogin: Date;

  @Prop()
  mobile: string;

  @Prop({ enum: ['Married', 'divorcee', 'widower', 'Bachelor'] })
  status: string;

  @Prop()
  dateOfBirth: Date;

  @Prop({ type: Object })
  address: {
    city: string;
    street: string;
    num: number;
  };
  @Prop()
  phone: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
