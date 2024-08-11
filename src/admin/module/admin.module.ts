import { Module } from '@nestjs/common';
import { AdminController } from '../admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { User, UserSchema } from 'src/schemas/user.entity';
import { Role, RoleSchema } from 'src/schemas/EmployeeRole.entity';
import { AdminService } from '../services/admin.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
