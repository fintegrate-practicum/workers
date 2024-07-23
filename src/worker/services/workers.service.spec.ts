import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from '../services/workers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { Role } from '../../schemas/EmployeeRole.entity'; // ודא שהנתיב נכון
import { Types } from 'mongoose';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { workerValidationsSchema } from '../validations/worker.validations.schema';

const mockEmployee = {
  _id: new Types.ObjectId(),
  userId: '12345',
  businessId: new Types.ObjectId(),
  nameEmployee: 'John Doe',
  code: 'EMP001',
  createdBy: 'admin',
  updatedBy: 'admin',
  role: {
    type: 'developer',
    active: false,
    description: 'Developer Role',
  },
} as Employee;

const mockEmployeeModel = {
  create: jest.fn().mockResolvedValue(mockEmployee),
  find: jest.fn().mockResolvedValue([mockEmployee]),
  findOne: jest.fn().mockResolvedValue(mockEmployee),
  findOneAndUpdate: jest.fn().mockResolvedValue(mockEmployee),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockEmployee),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockEmployee),
  exec: jest.fn(),
};

describe('WorkersService', () => {
  let service: WorkersService;
  let model: Model<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkersService,
        {
          provide: getModelToken('Employee'),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<WorkersService>(WorkersService);
    model = module.get<Model<Employee>>(getModelToken('Employee'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEmployee', () => {
    it('should throw BadRequestException if worker is not provided', async () => {
      await expect(service.createEmployee(null)).rejects.toThrow(BadRequestException);
    });

    it('should create and return an employee with valid data', async () => {
      const worker: workerValidationsSchema = {
        userId: '12345',
        businessId: new Types.ObjectId().toString(), // השתמש בסוג המתאים
        nameEmployee: 'John Doe',
        code: 'EMP001',
        createdBy: 'admin',
        updateBy: 'admin', // השתמש בשם השדה הנכון
        role: {
          type: 'developer',
          active: false,
          description: 'Developer Role',
        } as Role, // הנח את סוג התפקיד המתאים
      };

      // סימולציה של הפונקציה create להחזיר את המידע
      jest.spyOn(model, 'create').mockResolvedValueOnce(worker as any);

      const result = await service.createEmployee(worker);

      // בדוק שהתוצאה תואמת למידע שהוחזר על ידי הפונקציה create
      expect(result).toEqual(worker);

      // בדוק שהפונקציה create קיבלה את הפרמטר הנכון
      expect(mockEmployeeModel.create).toHaveBeenCalledWith(worker);
    });
  // });
// });

describe('getEmployeeByUserId', () => {
  it('should throw BadRequestException if userId is not provided', async () => {
    await expect(service.getEmployeeByUserId(null)).rejects.toThrow(BadRequestException);
  });

  it('should return an employee if found', async () => {
    const userId = '12345';

    // ודא שהמודל מחזיר את המידע הנכון
    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockEmployee),
    } as any);

    const result = await service.getEmployeeByUserId(userId);
    expect(result).toEqual(mockEmployee);
    expect(mockEmployeeModel.findOne).toHaveBeenCalledWith({ userId });
  });

  it('should throw HttpException if employee is not found', async () => {
    const userId = 'nonExistingUserId';

    // ודא שהמודל מחזיר null כשהעובד לא נמצא
    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
  });

  it('should throw HttpException for internal server error', async () => {
    const userId = '12345';

    // סימולציה של שגיאה כללית בעת קריאה למודל
    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error('Some error')),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
//   describe('getEmployee', () => {
//     it('should find and return an employee by ID', async () => {
//       jest.spyOn(model, 'findById').mockResolvedValueOnce(mockEmployee[0]);
//       const result = await workersService.getEmployeeByUserId(mockEmployee[0].code);
//       expect(result).toEqual(mockEmployee[0]);
//     });

//     it('should handle error when employee is not found', async () => {
//       jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
//       await expect(
//         workersService.getEmployeeByUserId('nonExistentCode'),
//       ).rejects.toThrowError();
//     });
//   });

  // describe('updateEmployee', () => {
  //   it('should update and return an employee by ID', async () => {
  //     jest
  //       .spyOn(model, 'findByIdAndUpdate')
  //       .mockResolvedValueOnce(mockEmployee[0]);
  //     const updatedEmployeeData = new Employee({
  //       roleId: 20,
  //       createdBy: 'Dan',
  //       updatedBy: 'Yon',
  //     });
  //     const result = await service.updateEmployeeByUserId(
  //       mockEmployee[0].code,
  //       updatedEmployeeData,
  //     );
  //     expect(result).toEqual(mockEmployee[0]);
  //   });

  //   it('should handle error when updating employee fails', async () => {
  //     jest
  //       .spyOn(model, 'findByIdAndUpdate')
  //       .mockRejectedValueOnce(new Error('Update failed'));
  //     const updatedEmployeeData = new Employee({
  //       code: '1',
  //       roleId: new Types.ObjectId(),
  //       createdBy: 'Dan',
  //       updatedBy: 'Yon',
  //     });
  //     await expect(
  //       service.updateEmployeeByUserId(
  //         mockEmployee[0].code,
  //         updatedEmployeeData,
  //       ),
  //     ).rejects.toThrowError('Update failed');
  //   });
  // });

  // describe('deleteEmployee', () => {
  //   it('should delete and return an employee by ID', async () => {
  //     jest
  //       .spyOn(model, 'findByIdAndDelete')
  //       .mockResolvedValueOnce(mockEmployee[0]);
  //     const result = await service.deleteEmployee(mockEmployee[0].code);
  //     expect(result).toEqual(mockEmployee[0]);
  //   });

  //   it('should handle error when deleting employee fails', async () => {
  //     jest
  //       .spyOn(model, 'findByIdAndDelete')
  //       .mockRejectedValueOnce(new Error('Deletion failed'));
  //     await expect(
  //       service.deleteEmployee('invalidCode'),
  //     ).rejects.toThrowError('Deletion failed');
  //   });
  // });

  // describe('findAllByBusinessId', () => {
  //   it('should find and return employees by business ID', async () => {
  //     const businessId = '123456789';
  //     const mockEmployees = [mockEmployee[0], mockEmployee[1]];
  //     jest.spyOn(model, 'find').mockResolvedValueOnce(mockEmployees);
  //     jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(2);
  //     const result = await service.findAllByBusinessId(businessId);
  //     expect(result).toEqual(mockEmployees);
  //   });
  // });
});
});



