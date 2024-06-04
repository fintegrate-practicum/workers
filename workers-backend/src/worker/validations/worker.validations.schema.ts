import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';

export enum RoleEnum {
  secretary = 'secretary',
  cleaner = 'cleaner',
  deliveryPerson = 'deliveryPerson',
  developer = 'developer',
  tester = 'tester',
  manager = 'manager',
  owner = 'owner',
}

export class workerValidationsSchema {
  @IsNotEmpty()
  @IsString()
  businessId: string;

  @IsNotEmpty()
  @IsString()
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
  role: RoleEnum;
}