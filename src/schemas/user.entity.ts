import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop({ type: Types.ObjectId, ref: 'permission' })
    permissionId: Types.ObjectId

    @Prop()
    registeredAt: Date

    @Prop()
    lastLogin: Date

    @Prop()
    mobile: String;

    @Prop({enum: ['Married', 'divorcee', 'widower', 'Bachelor']})
    status: String

    @Prop()
    dateOfBirth: Date

    @Prop()
    address: {
        city: String,
        street: String,
        num:Number
    }
}

export const UserSchema = SchemaFactory.createForClass(User);