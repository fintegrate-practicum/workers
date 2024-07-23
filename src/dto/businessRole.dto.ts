import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BusinessRole {
  @ApiProperty({
    description: 'ID of the business',
    example: '12345',
  })
//   @IsNotEmpty()
  @IsString()
  businessId: string;

  @ApiProperty({
    description: 'Role of the user in the business',
    example: 'Manager',
  })
//   @IsNotEmpty()
  @IsString()
  role: string;
}