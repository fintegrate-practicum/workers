import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/enum/taskStatus.enum';

export class UpdateTaskEmployeeDto {
  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Develop and implement the new authentication feature',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.ToDo,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}



