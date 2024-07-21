import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { AuthGuard } from '@nestjs/passport';

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
    return this._userService.checkAndAddUser(auth0_user_id, emailFromHeaders);
  }
  

  @Post()
  async createUser(@Body() user: CreateUserDto) {
      return this._userService.createUser(user);
    }
   
  

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(req, @Body() user: UpdateUserDto) {
      return this._userService.updateUser(req.user.id, user);
  }
}

