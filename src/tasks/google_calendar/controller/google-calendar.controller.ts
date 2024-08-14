import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { GoogleCalendarService } from '../service/google-calendar.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventDto } from '../../../dto/createEvent.dto';
import { Response } from 'express';

@ApiTags('User')
@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('auth')
  async getAuthUrl(@Res() res: Response) {
    const url = this.googleCalendarService.generateAuthUrl();
    return res.status(200).json({ url });
  }

  @Get('oauth2callback')
  async oauth2Callback(@Query('code') code: string, @Res() res: Response) {
    console.log('Authorization code received:', code);
    await this.googleCalendarService.setCredentials(code);
    return res.send('Authentication successful! You can now use the calendar service.');
  }

  @Get('events')
  async getEvents(@Query('email') email: string) {
    return this.googleCalendarService.getEvents(email);
  }

  @Post('events')
  @ApiBody({ type: EventDto, description: 'The event object to be added to the Google Calendar' })
  async addEvent(@Body() event: EventDto) {
    console.log("addEvent", event);
    const email = event.attendees[0].email;
    await this.googleCalendarService.addEvent(email, event);
    return 'Event added successfully!';
  }

  @Put('events/:id')
@ApiParam({ name: 'id', description: 'ID of the event to update' })
@ApiBody({ type: EventDto })
async updateEvent(
  @Param('id') id: string,
  @Query('email') email: string,
  @Body() updatedEvent: Partial<EventDto>,
) {
  const event = await this.googleCalendarService.updateEvent(email, id, updatedEvent);
  return event;
}


  @Get('events/:id')
  @ApiParam({ name: 'id', description: 'ID of the event to retrieve' })
  async getEventById(@Param('id') id: string, @Query('email') email: string) {
    console.log('getEventById', id, email);
    const event = await this.googleCalendarService.getEventById(email, id);
    return event;
  }

  @Delete('events/:id')
  @ApiParam({ name: 'id', description: 'ID of the event to delete' })
  async deleteEvent(@Param('id') id: string, @Query('email') email: string) {
    console.log('deleteEvent', id, email);
    await this.googleCalendarService.deleteEvent(email, id);
    return 'Event deleted successfully!';
  }
}