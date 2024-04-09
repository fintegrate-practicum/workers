
import { NotificationService } from './nottification.service';
import { ClientProxy } from '@nestjs/microservices';

describe('NotificationService', () => {
  let service: NotificationService;
  let client: jest.Mocked<ClientProxy>; 

  beforeEach(() => {
    client = {
      emit: jest.fn().mockReturnThis(), 
      toPromise: jest.fn(), 
    } as any;

    service = new NotificationService(client);
  });

  it('should send recruitment notification', async () => {
    await service.sendRecruitmentNotification(
      'recipient',
      'messageType',
      'jobTitle',
      'positionName',
      'departmentName',
      'jobDescription',
      'requirements',
      'jobType',
      'beginningOfWork',
      'emailAddress',
      'applicationDeadline',
      'nameOfHRDepartment',
    );

    expect(client.emit).toHaveBeenCalledWith('notification', expect.any(String));
  });
});
