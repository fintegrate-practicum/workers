import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { TaskStatus } from '../enum/taskStatus.enum';
export class CreateTaskDto {
  @ApiProperty({
    description: 'ID of the company',
    example: 'company123',
  })
  @IsNotEmpty()
  @IsString()
  businessId: Types.ObjectId;
  @ApiProperty({
    description: 'Name of the task',
    example: 'Develop new feature',
  })
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty({
    description: 'Id to the manager',
    example: 'employee123',
  })
  @IsNotEmpty()
  @IsString()
  managerId: string;
  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Develop and implement the new authentication feature',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Target date for task completion',
    example: '2024-12-31',
  })
  @IsNotEmpty()
  @IsDate()
  targetDate: Date;
  @ApiProperty({
    description: 'ID of the employee associated with the task',
    example: ['664cba7ee786ab5c121aa40b', '123765434567hgfdfghjkhgfgh'],
  })
  @IsNotEmpty()
  @IsArray()
  employee: Types.ObjectId[];

  @ApiProperty({
    description: 'The urgency level of the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  urgency: number;
  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.ToDo,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
  @ApiProperty({
    description: 'Completion date of the task',
    example: '2024-12-31',
    required: false,
  })
  @IsDate()
  completionDate: Date;
  @ApiProperty({
    description: 'Link to task',
    example: 'http://localhost:3001/api#/Workers/WorkersController_create',
  })
  @IsNotEmpty()
  @IsString()
  directLink: string;

  @IsArray()
  tags: string[];
}
