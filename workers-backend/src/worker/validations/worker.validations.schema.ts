import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';

export class workerValidationsSchema {
  @IsString()
  @IsNotEmpty()
  businessId:string

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsMongoId()
  roleId: string;

  @IsEnum([
    'secretary',
    'cleaner',
    'deliveryPerson',
    'developer',
    'tester',
    'maneger',
    'owner',
  ])
  position: string;
}