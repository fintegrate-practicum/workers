import { ApiProperty } from '@nestjs/swagger';
class EventDateTime {
  @ApiProperty({ example: '2024-08-04T10:00:00Z', description: 'The date and time of the event' })
  dateTime: string;
  @ApiProperty({ example: 'America/Los_Angeles', description: 'The time zone of the event' })
  timeZone: string;
}
class EventReminder {
  @ApiProperty({ example: 'email', description: 'The method of the reminder' })
  method: string;
  @ApiProperty({ example: 1440, description: 'The minutes before the event when the reminder should trigger' })
  minutes: number;
}
class EventAttendee {
  @ApiProperty({ example: 'elemetorkamatech2@gmail.com', description: 'The email of the attendee' })
  email: string;
}
export class EventDto {
  @ApiProperty({ example: 'Meeting with John', description: 'The title of the event' })
  summary: string;
  @ApiProperty({ example: 'Conference room', description: 'The location of the event' })
  location: string;
  @ApiProperty({ example: 'Discuss project progress', description: 'The description of the event' })
  description: string;
  @ApiProperty({ type: EventDateTime })
  start: EventDateTime;
  @ApiProperty({ type: EventDateTime })
  end: EventDateTime;
  @ApiProperty({ type: [EventAttendee] })
  attendees: EventAttendee[];
  @ApiProperty({ type: [EventReminder], description: 'The reminders for the event' })
  reminders: {
    useDefault: boolean;
    overrides: EventReminder[];
  };
}