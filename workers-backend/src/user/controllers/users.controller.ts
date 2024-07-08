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
  ConflictException,
  InternalServerErrorException,
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
    if (!auth0_user_id) {
      throw new BadRequestException('User ID must be provided');
}
    return this._userService.findOneByUserAuth0Id(auth0_user_id);
  }

  @Put('jwt')
  @UseGuards(AuthGuard('jwt'))
  async checkAndAddUser(@Request() req): Promise<string> {
    const auth0_user_id = req.user.id;
    if(!auth0_user_id)
    throw new BadRequestException('Auth0 user ID not provided');
    const emailFromHeaders = req.headers['us'];
    if(!emailFromHeaders)
    throw new BadRequestException('user email not provided');
    console.log(`User Email: ${emailFromHeaders}`);
    return this._userService.checkAndAddUser(auth0_user_id, emailFromHeaders);
  }
  


  @Post('')
  async createUser(@Body() user: CreateUserDto) {
    try {
      if(!user) {
        throw new BadRequestException('user is null');
      }
      return this._userService.createUser(user);
    } catch (error) {
      if (error.name === 'ConflictException') {
        throw new ConflictException(error.message);
      }
       else if (error.code==400) {
        throw new BadRequestException('Failed to create user');

        }  
       throw new InternalServerErrorException('Unexpected error occurred');

      }
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
