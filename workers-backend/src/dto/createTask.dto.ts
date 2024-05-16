import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Tech Corp',
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'ID of the manager responsible for the task',
    example: 'manager123',
  })
  @IsNotEmpty()
  @IsString()
  managerId: string;

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
    description: 'Target date for task completion',
    example: '2024-12-31',
  })
  @IsNotEmpty()
  @IsString()
  targetDate: string;

  @ApiProperty({
    description: 'ID of the employee associated with the task',
    example: 'moshe',
  })
  @IsNotEmpty()
  @IsString()
  associatedWithEmployee: string;

  @ApiProperty({
    description: 'The urgency level of the task',
    example: 'High',
  })
  @IsNotEmpty()
  @IsNumber()
  theUrgencyOfTheTask: number;
}
