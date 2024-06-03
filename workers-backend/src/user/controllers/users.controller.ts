import { User } from 'src/schemas/user.entity';
import { UsersService } from '../services/users.service';
import { Controller, Get } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
