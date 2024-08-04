import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { RoleValidationSchema } from './worker.roleValidation.schema';

export class workerValidationsSchema {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  code: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  nameEmployee: string;

  @IsString()
  @IsNotEmpty()
  updatedBy: string;

  @IsNotEmpty()
  @IsObject()
  role: RoleValidationSchema;
}