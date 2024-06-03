import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
} from 'class-validator';
import { StatusEnum } from 'src/schemas/task.entity';
export class CreateTaskDto {
  @ApiProperty({
    description: 'ID of the employee',
    example: 'employee123',
  })
  @IsNotEmpty()
  // @IsString()
  employeeId: Types.ObjectId;
  @ApiProperty({
    description: 'ID of the company',
    example: 'company123',
  })
  @IsNotEmpty()
  @IsString()
  businessId: string;
  @ApiProperty({
    description: 'Name of the task',
    example: 'Develop new feature',
  })
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty({
    description: 'Id to the manager',
    example: '1234managet',
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
    example: '2024-05-10',
  })
  @IsNotEmpty()
  @IsString()
  employee: string;
  @ApiProperty({
    description: 'The urgency level of the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  urgency: number;
  @ApiProperty({
    description: 'The status of the task',
    enum: StatusEnum,
    example: StatusEnum.ToDo,
  })
  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
  @ApiProperty({
    description: 'Completion date of the task',
    example: '2024-12-31',
    required: false,
  })
  @IsDate()
  completionDate: Date;
}
