import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ type: Types.ObjectId, ref: 'employee' })
  ResponsibleEmployee: Types.ObjectId;

  @Prop()
  projectName: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
