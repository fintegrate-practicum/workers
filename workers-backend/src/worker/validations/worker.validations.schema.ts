import { IsNotEmpty, IsString, IsEnum, IsMongoId, IsObject } from 'class-validator';
import { RoleValidationSchema } from './workRole.validationSchema';

export class workerValidationsSchema {
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @IsNotEmpty()
  @IsString()
  code: string;
  
  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  nameEmployee:string;
  
  @IsString()
  @IsNotEmpty()
  updateBy: string;


  role: RoleValidationSchema;
}
