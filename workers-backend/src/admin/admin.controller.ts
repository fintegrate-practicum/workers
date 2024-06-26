import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import {User} from '../schemas/user.entity'
// import { Admin } from './admin.entity';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) :Promise<User>{
    return this.adminService.getUserById(id);
  }

  @Get('business/:businessId/users')
  async getUsersByBusinessId(@Param('businessId') businessId: string) :Promise<User[]>{
    return this.adminService.getUsersByBusinessId(businessId);
  }

  // @Get()
  // async findAll(): Promise<Admin[]> {
  //   return this.adminService.findAll();
  // }

  // @Get(':id')
  // getAdmin(@Param('id') id: string) {
  //   return this.adminService.getAdmin(id);
  // }
}
