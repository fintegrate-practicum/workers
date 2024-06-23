import {
    Controller,
    Get,
    Param,
    UseInterceptors,
    Query,
    Body,
    Post,
    ValidationPipe,
    HttpException,
    HttpStatus,
    BadRequestException,
  } from '@nestjs/common';
  import { UserService } from '../services/users.service';
  import { ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
  import { Logger } from '@nestjs/common';
import { User } from 'src/schemas/user.entity';
import { CreateUserDto } from 'src/dto/createUser.dto';
  @ApiTags('User')
  @Controller('user')
  export class UsersController {
    private readonly logger = new Logger(UsersController.name);
  
    constructor(private readonly workersService: UserService) {}
    @Get(':id')
    getWorker(@Param('id') auth0_user_id: string) {
      console.log(auth0_user_id);
      
      return this.workersService.findOneByUserId(auth0_user_id);
    }

    @Post('')
    async createTask(@Body() user: CreateUserDto) {
      try {
        return this.workersService.createUser(user);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
  