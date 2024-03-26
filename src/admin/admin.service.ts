import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker } from './worker.entity'; // Assuming Worker entity is defined
   @Injectable()
export class AdminService {
    constructor(@InjectModel('Worker') private readonly workerModel: Model<Worker>) {}

    async findAll(): Promise<Worker[]> {
      return this.workerModel.find().exec();
    }

    async getA(id: string): Promise<Worker> {
      return await this.workerModel.findById(id).exec();
    }
}
