import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
export enum RoleEnum {
  'secretary',
  'cleaner',
  'deliveryPerson',
  'developer',
  'tester',
  'maneger',
  'owner',
} 
export class workerValidationsSchema {

  @IsString()
  @IsNotEmpty()
  businessId: string;

  // @IsNotEmpty()
  @IsMongoId()
  userId: string;

  code: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsNotEmpty()
  role: RoleEnum;
}
