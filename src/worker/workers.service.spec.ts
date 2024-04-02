import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from './workers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';

describe('WorkersService', () => {
  let workersService: WorkersService;
  let model: Model<Employee>;

const mockEmployee = [{
  code: '1',
  position: 'deliveryPerson',
  roleId: 30,
  createdBy: "Dan",
  updatedBy: "Yon",
}];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkersService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    workersService = module.get<WorkersService>(WorkersService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  describe('createEmployee', () => {
    it('should create and return an employee', async () => {
      jest.spyOn(model, 'create').mockResolvedValue(mockEmployee);

      const newEmployee: Employee = {
        position: 'deliveryPerson',
        roleId: 30,
        createdBy: "Dan",
        updatedBy: "Yon",
      };

      const result = await workersService.createEmployee(newEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('getEmployee', () => {
    it('should find and return an employee by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockEmployee);

      const result = await workersService.getEmployee(mockEmployee.code);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('updateEmployee', () => {
    it('should update and return an employee by ID', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockEmployee);

      const updatedEmployeeData: Employee = {
        position: 'Senior Engineer',
        age: 35,
      };

      const result = await workersService.updateEmployee(mockEmployee.code, updatedEmployeeData);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete and return an employee by ID', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockEmployee);

      const result = await workersService.deleteEmployee(mockEmployee.code);
      expect(result).toEqual(mockEmployee);
    });
  });
});
