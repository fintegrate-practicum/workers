import { Test, TestingModule } from '@nestjs/testing';
import { EventDto } from 'src/dto/createEvent.dto';
import { GoogleCalendarService } from '../service/google-calendar.service';
import { GoogleCalendarController } from './google-calendar.controller';

describe('GoogleCalendarController', () => {
  let controller: GoogleCalendarController;
  let service: GoogleCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleCalendarController],
      providers: [
        {
          provide: GoogleCalendarService,
          useValue: {
            generateAuthUrl: jest.fn(),
            setCredentials: jest.fn(),
            getEvents: jest.fn(),
            addEvent: jest.fn(),
            updateEvent: jest.fn(),
            getEventById: jest.fn(),
            deleteEvent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GoogleCalendarController>(GoogleCalendarController);
    service = module.get<GoogleCalendarService>(GoogleCalendarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return auth URL', async () => {
    const mockUrl = 'http://auth-url';
    jest.spyOn(service, 'generateAuthUrl').mockReturnValue(mockUrl);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.getAuthUrl(res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url: mockUrl });
  });

  it('should handle OAuth2 callback', async () => {
    const res = {
      send: jest.fn(),
    } as any;
    await controller.oauth2Callback('auth_code', res);
    expect(service.setCredentials).toHaveBeenCalledWith('auth_code');
    expect(res.send).toHaveBeenCalledWith('Authentication successful! You can now use the calendar service.');
  });

  it('should return events for a valid email', async () => {
    const mockEvents = [{ id: '1', summary: 'Test Event' }];
    jest.spyOn(service, 'getEvents').mockResolvedValue(mockEvents);

    const events = await controller.getEvents('test@example.com');
    expect(events).toEqual(mockEvents);
    expect(service.getEvents).toHaveBeenCalledWith('test@example.com');
  });

  it('should add an event', async () => {
    const mockEventDto: EventDto = {
      attendees: [{ email: 'attendee@example.com' }],
      summary: 'New Event',
    } as EventDto;

    const result = await controller.addEvent(mockEventDto);
    expect(service.addEvent).toHaveBeenCalledWith('attendee@example.com', mockEventDto);
    expect(result).toBe('Event added successfully!');
  });

  it('should update an event', async () => {
    const mockUpdatedEvent = { summary: 'Updated Event' } as Partial<EventDto>;
    const mockEvent = { id: '1', summary: 'Updated Event' };
    jest.spyOn(service, 'updateEvent').mockResolvedValue(mockEvent);

    const event = await controller.updateEvent('1', 'test@example.com', mockUpdatedEvent);
    expect(service.updateEvent).toHaveBeenCalledWith('test@example.com', '1', mockUpdatedEvent);
    expect(event).toEqual(mockEvent);
  });

  it('should return event by ID', async () => {
    const mockEvent = { id: '1', summary: 'Test Event' };
    jest.spyOn(service, 'getEventById').mockResolvedValue(mockEvent);

    const event = await controller.getEventById('1', 'test@example.com');
    expect(event).toEqual(mockEvent);
    expect(service.getEventById).toHaveBeenCalledWith('test@example.com', '1');
  });

  it('should delete an event by ID', async () => {
    const result = await controller.deleteEvent('1', 'test@example.com');
    expect(service.deleteEvent).toHaveBeenCalledWith('test@example.com', '1');
    expect(result).toBe('Event deleted successfully!');
  });
});
