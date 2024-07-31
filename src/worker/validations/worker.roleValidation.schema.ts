import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class RoleValidationSchema {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  description: string;
}
