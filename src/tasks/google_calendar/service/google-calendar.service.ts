import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { google } from 'googleapis';
import { EventDto } from 'src/dto/createEvent.dto';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: any;
  client_id_from_google_console=process.env.CLIENT_ID_FROM_GOOGLE_CONSOLE;
  client_secret_code_google_console=process.env.CLIENT_SECRET_CODE_GOOGLE_CONSOLE;
  scopes_google_calendar=process.env.SCOPES_GOOGLE_CALENDAR;
  redirect_uri_for_auth=process.env.REDIRECT_URI_FOR_AUTH;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      this.client_id_from_google_console,
      this.client_secret_code_google_console,
      this.redirect_uri_for_auth
    );
  }

  generateAuthUrl() {
    const scopes = this.scopes_google_calendar;
    const redirect_uri=this.redirect_uri_for_auth;
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      redirect_uri
    });
  }

  async setCredentials(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
  }
  
  async getEvents(email: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    const events = await calendar.events.list({
      calendarId: email,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return events.data.items;
  }
  
  async addEvent(email: string, event: EventDto) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !event) {
      throw new BadRequestException('Missing required parameters');
    }
    await calendar.events.insert({
      calendarId: email,
      requestBody: event,
    });
  }
  
  async updateEvent(email: string, eventId: string, updatedEvent: Partial<EventDto>) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    const existingEvent = await this.getEventById(email, eventId);
    
    if (!existingEvent) {
      throw new NotFoundException('Event not found');
    }
  
    const eventToUpdate = {
      ...existingEvent,
      ...updatedEvent,
    };
  
    const updatedEventResponse = await calendar.events.update({
      calendarId: email,
      eventId: eventId,
      requestBody: eventToUpdate,
    });
  
    return updatedEventResponse.data;
  }
  
  async getEventById(email: string, eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !eventId) {
      throw new BadRequestException('Missing required parameters');
    }
    const event = await calendar.events.get({
      calendarId: email,
      eventId: eventId,
    });
    return event.data;
  }
  
  async deleteEvent(email: string, eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !eventId) {
      throw new BadRequestException('Missing required parameters');
    }
    await calendar.events.delete({
      calendarId: email,
      eventId: eventId,
    });
  }
  
}