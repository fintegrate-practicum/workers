import { IsNotEmpty, IsString, IsEnum, IsMongoId, Matches } from 'class-validator';

export class workerValidationsSchema {
  @IsString()
  @IsNotEmpty()
  businessId:string

  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  workerCode:string

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  // @IsString()
  // @IsNotEmpty()
  // updatedBy: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
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