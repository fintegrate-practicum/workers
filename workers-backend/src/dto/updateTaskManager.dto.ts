import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { TaskStatus } from '../enum/taskStatus.enum';

export class UpdateTaskManagerDto {
  @ApiProperty({
    description: 'Name of the task',
    example: 'Develop new feature',
  })
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Develop and implement the new authentication feature',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID of the employee associated with the task',
    example: [
      {
        userId: '664cba7ee786ab5c121aa40b',
      },
      {
        userId: '123765434567hgfdfghjkhgfgh',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  employee: Types.ObjectId[];

  @IsNotEmpty()
  @IsDate()
  targetDate: Date;
  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.ToDo,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
