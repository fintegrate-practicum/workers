import { Test, TestingModule } from '@nestjs/testing';
import { google } from 'googleapis';
import { EventDto } from 'src/dto/createEvent.dto';
import { GoogleCalendarService } from './google-calendar.service';

describe('GoogleCalendarService', () => {
  let service: GoogleCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleCalendarService],
    }).compile();

    service = module.get<GoogleCalendarService>(GoogleCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate auth URL', () => {
    const url = service.generateAuthUrl();
    expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
  });

  it('should get events for a valid email', async () => {
    const mockList = jest.fn().mockResolvedValue({ data: { items: [] } });
    google.calendar = jest.fn().mockReturnValue({
      events: { list: mockList }
    });

    const events = await service.getEvents('test@example.com');
    expect(events).toEqual([]);
    expect(mockList).toHaveBeenCalled();
  });

  it('should add an event', async () => {
    const mockInsert = jest.fn().mockResolvedValue({});
    google.calendar = jest.fn().mockReturnValue({
      events: { insert: mockInsert }
    });

    await service.addEvent('test@example.com', { summary: 'Test Event' } as EventDto);
    expect(mockInsert).toHaveBeenCalledWith({
      calendarId: 'test@example.com',
      requestBody: { summary: 'Test Event' },
    });
  });

  it('should update an event', async () => {
    const mockUpdate = jest.fn().mockResolvedValue({ data: {} });
    const mockGetEventById = jest.fn().mockResolvedValue({ id: '1', summary: 'Existing Event' });
    service.getEventById = mockGetEventById;
    google.calendar = jest.fn().mockReturnValue({
      events: { update: mockUpdate }
    });

    const updatedEvent = await service.updateEvent('test@example.com', '1', { summary: 'Updated Event' });
    expect(updatedEvent).toEqual({});
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should delete an event', async () => {
    const mockDelete = jest.fn().mockResolvedValue({});
    google.calendar = jest.fn().mockReturnValue({
      events: { delete: mockDelete }
    });

    await service.deleteEvent('test@example.com', '1');
    expect(mockDelete).toHaveBeenCalledWith({
      calendarId: 'test@example.com',
      eventId: '1',
    });
  });
});