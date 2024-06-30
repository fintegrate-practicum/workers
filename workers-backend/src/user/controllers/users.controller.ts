import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  BadRequestException,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { User } from 'src/schemas/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@ApiTags('User')
@Controller('user')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly _userService: UserService) { }

  @Get(':id')
  getWorker(@Param('id') auth0_user_id: string) {
    return this._userService.findOneByUserId(auth0_user_id);
  }

  @Put('jwt')
  @UseGuards(AuthGuard('jwt'))
  async checkAndAddUser(@Request() req): Promise<string> {
    const auth0_user_id = req.user.id;
    const emailFromHeaders = req.headers['Email'];
    if (!emailFromHeaders) {
      throw new BadRequestException('Email not found in headers');
    }
    console.log(`User ID: ${auth0_user_id}`);
    console.log(`User Email: ${emailFromHeaders}`);
    const existingUser = await this._userService.findOneByUserId(auth0_user_id);
    if (existingUser) {
      return `User with id ${auth0_user_id} already exists.`;
    }
    const existingUserByEmail = await this._userService.findOneByEmail(emailFromHeaders);

    const updatedUser = await this._userService.updatAuth0UserId(existingUserByEmail, auth0_user_id);
    if (updatedUser) {
      return `User with email ${emailFromHeaders} already exists and was updated with the new ID ${auth0_user_id}.`;
    }
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
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    try {
      return this._userService.updateUser(id, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
