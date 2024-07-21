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

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getWorker(req) {
    const auth0_user_id = req.user.id;
    return this._userService.findOneByUserAuth0Id(auth0_user_id);
  }
  @Put('jwt')
  @UseGuards(AuthGuard('jwt'))
  async checkAndAddUser(@Request() req): Promise<string> {
    const auth0_user_id = req.user.id;
    const emailFromHeaders = req.headers['us'];
    console.log(`User Email: ${emailFromHeaders}`);
    return this._userService.checkAndAddUser(auth0_user_id, emailFromHeaders);
  }
  


  @Post('')
  async createUser(@Body() user: CreateUserDto) {
    try {
      return this._userService.createUser(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(req, @Body() user: UpdateUserDto) {
    try {
      return this._userService.updateUser(req.user.id, user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
