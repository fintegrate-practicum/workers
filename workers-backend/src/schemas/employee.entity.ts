import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppModule } from 'src/app.module';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ type: Types.ObjectId, ref: 'user' })
  userId: Types.ObjectId;

  @Prop()
  nameEmployee: string;

  @Prop()
  businessId: string;

  @Prop()
  code: string;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop({ type: Types.ObjectId, ref: 'role' })
  roleId: Types.ObjectId;

  @Prop({
    enum: [
      'secretary',
      'cleaner',
      'deliveryPerson',
      'developer',
      'tester',
      'maneger',
      'owner',
    ],
  })
  position: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
