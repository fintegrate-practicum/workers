import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ type: Types.ObjectId, ref: 'employee' })
  responsibleEmployee: Types.ObjectId;

  @Prop()
  projectname: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
