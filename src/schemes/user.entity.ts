import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ type: Types.ObjectId, ref: 'permission' })
    permissionId: Types.ObjectId

    @Prop({ require: true })
    firstName: string

    @Prop({ require: true })
    lastName: String

    @Prop({ require: true })
    username: String

    @Prop()
    registeredAt: Date

    @Prop()
    lastLogin: Date

    @Prop()
    passwordHash: String

    @Prop()
    email: String;

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