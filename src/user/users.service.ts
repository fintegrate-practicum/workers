import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.entity";
import { Model } from "mongoose";

  @Injectable()
  export class UserService {
  
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
  
    async findOneByUserId(userId: string): Promise<User | undefined> {
      if (!userId) {
        throw new BadRequestException('User ID must be provided');
  }
      const user = await this.userModel.findById(userId).exec();
      return user;
    }
  
  }