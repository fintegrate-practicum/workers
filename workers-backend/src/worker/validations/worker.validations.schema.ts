import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { RoleValidationSchema } from './worker.validationSchema';

export class workerValidationsSchema {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  updateBy: string;

  @IsNotEmpty()
  role: RoleValidationSchema;
}
