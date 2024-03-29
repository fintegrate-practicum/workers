import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController{
    constructor(private readonly _userService:UsersService){}

    @Get(':id')
    async getUser(@Param('id') id:string):Promise<any>{
        return this._userService.getUser(id);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserData:any):Promise<any>{
        return this._userService.updateUser(id,updateUserData)
    }
}