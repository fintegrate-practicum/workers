import { Module } from '@nestjs/common';
import { AdminController } from '../admin.controller';
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
import { AdminService } from '../services/admin.service';
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
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
