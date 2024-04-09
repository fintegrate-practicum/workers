import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  logo: string;

  @Prop()
  phone: string;

  @Prop()
  address: {
    city: string;
    street: string;
    num: number;
  };
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
