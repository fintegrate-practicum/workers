import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
import { Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { User } from 'src/schemas/user.entity';
@ApiTags('User')
@Controller('user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly _userService: UserService) {}
  @Get(':id')
  getWorker(@Param('id') auth0_user_id: string) {
    return this._userService.findOneByUserId(auth0_user_id);
  }

  @Post('')
  async createUser(@Body() user: CreateUserDto) {
    try {
      return this._userService.createUser(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    try {
      return this._userService.updateUser(id, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
