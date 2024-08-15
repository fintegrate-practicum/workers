import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { User } from '../schemas/user.entity';
import { Role, Roles, RolesGuard } from 'fintegrate-auth';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('user/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.adminService.getUserById(id);
  }

  @Get('business/:businessId/users')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUsersByBusinessId(
    @Param('businessId') businessId: string,
  ): Promise<User[]> {
    return this.adminService.getUsersByBusinessId(businessId);
  }

  @Get('business/:businessId/client')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getClientsByBusinessId(
    @Param('businessId') businessId: string,
  ): Promise<User[]> {
    return this.adminService.getClientsByBusinessId(businessId);
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
