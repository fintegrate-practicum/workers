import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose, Types } from 'mongoose';
import { AppModule } from 'src/app.module';
export enum RoleEnum {
  'secretary',
  'cleaner',
  'deliveryPerson',
  'developer',
  'tester',
  'maneger',
  'owner',
}
@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop()
  businessId: string;

  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  code: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  role: RoleEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
