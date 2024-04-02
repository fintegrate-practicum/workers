import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Organization extends Document {

    @Prop()
    description: String

    @Prop()
    name: String

    @Prop()
    email: String;

    @Prop()
    logo: String

    @Prop()
    phone: String

    @Prop()
    address: {
        city: String,
        street: String,
        num:Number
    }
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);