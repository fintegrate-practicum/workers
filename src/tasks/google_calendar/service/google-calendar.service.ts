import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { EventDto } from 'src/dto/createEvent.dto';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: any;
  client_id=process.env.CLIENT_ID;
  client_secret=process.env.CLIENT_SECRET;
  redirect_uris=process.env.REDIRECT_URIS;
  scopes=process.env.SCOPES;
  redirect_uri=process.env.REDIRECT_URI;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      this.client_id,
      this.client_secret,
      this.redirect_uris
    );
  }

  generateAuthUrl() {
    const scopes = this.scopes;
    const redirect_uri=this.redirect_uri;
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
      throw new Error('Missing required parameters');
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
      throw new Error('Event not found');
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
      throw new Error('Missing required parameters');
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
      throw new Error('Missing required parameters');
    }
    await calendar.events.delete({
      calendarId: email,
      eventId: eventId,
    });
  }
  
}