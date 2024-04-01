import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: 'permission' })
  permissionId: Types.ObjectId;

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

  @Prop()
  address: {
    city: string;
    street: string;
    num: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
