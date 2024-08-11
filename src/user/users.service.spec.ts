import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.entity';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            findById: jest.fn().mockImplementation(() => ({
              exec: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByUserId', () => {
    it('should throw BadRequestException if userId is not provided', async () => {
      await expect(service.findOneByUserId('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return a user if found', async () => {
      const userId = 'validUserId';
      const expectedUser = {
        _id: userId,
        name: 'Test User',
      } as unknown as User;

      (userModel.findById as jest.Mock).mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce(expectedUser),
      }));

      const result = await service.findOneByUserId(userId);
      expect(result).toEqual(expectedUser);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should return null if user is not found', async () => {
      const userId = 'validUserId';

      (userModel.findById as jest.Mock).mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValueOnce(null),
      }));

      const result = await service.findOneByUserId(userId);
      expect(result).toBeNull();
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });
  });
});
