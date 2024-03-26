import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker } from './worker.entity';

@Injectable()
export class WorkersService {
  constructor(@InjectModel('Worker') private readonly workerModel: Model<Worker>) {}

  async createWorker(worker: Worker): Promise<Worker> {
    const newWorker = new this.workerModel(worker);
    return await newWorker.save();
  }

  async findAll(page = 1, limit = 10): Promise<{ workers: Worker[], total: number }> {
    const skip = (page - 1) * limit;
    const workers = await this.workerModel.find().skip(skip).limit(limit).exec();
    const total = await this.workerModel.countDocuments();
    return { workers, total };
  }

  async getWorker(id: string): Promise<Worker> {
    return await this.workerModel.findById(id).exec();
  }

  async updateWorker(id: string, worker: Worker): Promise<Worker> {
    return await this.workerModel.findByIdAndUpdate(id, worker, { new: true }).exec();
  }

  async deleteWorker(id: string): Promise<Worker> {
    return await this.workerModel.findByIdAndDelete(id).exec();
  }
}
