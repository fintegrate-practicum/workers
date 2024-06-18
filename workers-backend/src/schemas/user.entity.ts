import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  findOneByUserId(userId: string) {
    throw new Error('Method not implemented.');
  }
  @Prop()
  userId: string;
  
  @Prop()
  userName: string;
  
  @Prop()
  userEmail: string;
  
  @Prop()
  auth0_user_id: String;
  
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
}

export const UserSchema = SchemaFactory.createForClass(User);
