import { Module } from '@nestjs/common';
import { UserService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { Department, DepartmentSchema } from 'src/schemas/department.entity';
import {
  Organization,
  OrganizationSchema,
} from 'src/schemas/organization.entity';
import { Project, ProjectSchema } from 'src/schemas/project.entity';
import { User, UserSchema } from 'src/schemas/user.entity';
import { Role, RoleSchema } from 'src/schemas/EmployeeRole.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
