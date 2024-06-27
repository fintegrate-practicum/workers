// import {
//   Controller,
//   Get,
//   Param,
//   Body,
//   Post,
//   BadRequestException,
//   Put,
//   UseGuards,
//   Request,
// } from '@nestjs/common';
// import { UserService } from '../services/users.service';
// import { ApiTags } from '@nestjs/swagger'; // Import Swagger decorators
// import { Logger } from '@nestjs/common';
// import { CreateUserDto } from 'src/dto/createUser.dto';
// import { UpdateUserDto } from 'src/dto/updateUser.dto';
// import { User } from 'src/schemas/user.entity';
// import { AuthGuard } from '@nestjs/passport';
// @ApiTags('User')
// @Controller('user')
// export class UsersController {
//   private readonly logger = new Logger(UsersController.name);

//   constructor(private readonly _userService: UserService) {}
//   @Get(':id')
//   getWorker(@Param('id') auth0_user_id: string) {
//     return this._userService.findOneByUserId(auth0_user_id);
//   }
//   @Get('jwt')
//   @UseGuards(AuthGuard('jwt'))
//   async checkAndAddUser(@Request() req): Promise<string> {
//     const auth0_user_id = req.user.id;

//     // Check if the user already exists in the database
//     const existingUser = await this._userService.getUser(auth0_user_id);
//     if (existingUser) {
//       return `User with id ${auth0_user_id} already exists.`;
//     }

//     // If the user doesn't exist, add them to the database
//     const newUser: CreateUserDto = {
//       auth0_user_id, // Ensure your DTO includes the necessary fields
//       userName: req.user.name, // Example: assuming the user has a 'name' property
//       userEmail: req.user.email, // Example: assuming the user has an 'email' property
//     };

//     try {
//       await this._userService.createUser(newUser);
//       return `User with id ${auth0_user_id} added successfully.`;
//     } catch (error) {
//       throw new BadRequestException('Failed to create user');
//     }
//   }
//   @Post('')
//   async createUser(@Body() user: CreateUserDto) {
//     try {
//       return this._userService.createUser(user);
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() user: User) {
//     try {
//       return this._userService.updateUser(id, user);
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }
// }


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
 
 if (existingUserByEmail) {
   if( !existingUserByEmail.auth0_user_id)
      existingUserByEmail.auth0_user_id = auth0_user_id;
   console.log(existingUserByEmail.auth0_user_id);
   await this._userService.updateUser( existingUserByEmail.id ,existingUserByEmail);

      return `User with email ${emailFromHeaders} already exists and was updated with the new ID ${auth0_user_id}.`;
 }
 //במקרה שלא מצאה לא ידענו אם נכון להוסיף  אותו למסד 
    const newUser: CreateUserDto = {
      auth0_user_id,
      userName:  null,
      userEmail: null,
      registeredAt: new Date(),
      lastLogin: new Date(),
      mobile:  null,
      status: 'Bachelor', 
      dateOfBirth: null,
      address: {
        city:  null,
        street: null,
        num:  null,
      },
    };

    try {
      await this._userService.createUser(newUser);
      return `User with id ${auth0_user_id} added successfully.`;
    } catch (error) {
      throw new BadRequestException('Failed to create user');
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
