import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
export enum RoleEnum {
  secretary = 1,
  cleaner = 2,
  deliveryPerson = 4,
  developer = 8,
  tester = 16,
  manager = 32,
  owner = 64,
}
export class workerValidationsSchema {
  @IsNotEmpty()
  @IsString()
  businessId: string;
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
  @IsNotEmpty()
  @IsString()
  code: string;
  @IsNotEmpty()
  @IsString()
  createdBy: string;
  @IsNotEmpty()
  @IsString()
  updatedBy: string;
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: number;
}