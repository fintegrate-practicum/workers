import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from '../services/users.service';
import { User } from 'src/schemas/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
describe('UsersController', () => {
  let controller: UsersController;
  let services: UserService;

  const mockUser: Partial<User> = {
    auth0_user_id: 'n05y7452opu',
    registeredAt: new Date(),
    lastLogin: new Date(),
    mobile: 'asp',
    status: 'Married',
    dateOfBirth: new Date(),
    address: {
      city: 'Tel Aviv',
      street: 'Rothschild',
      num: 1,
    },
  };

  const mockUserService = {
    getUser: jest.fn((auth0_user_id: string) => {
      if (auth0_user_id === 'n05y7452opu') {
        return mockUser;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    services = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user when findOne is called', async () => {
    const user = await controller.getWorker('n05y7452opu');
    console.log(user);
    expect(user).toEqual(mockUser);
  });

  it('should return an error when findOne is called with a non-existent id', async () => {
    try {
      await controller.getWorker('n05y7452opu1');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
