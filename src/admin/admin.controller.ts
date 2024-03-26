import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }
  
  @Get(':id')
  getAdmin(@Param('id') id: string) {
    return this.adminService.getAdmin(id);
  }
}