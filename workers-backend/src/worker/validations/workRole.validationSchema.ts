import { IsNotEmpty, IsString, IsMongoId, IsBoolean } from 'class-validator';

export class RoleValidationSchema {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;
}
