import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { EventDto } from 'src/dto/createEvent.dto';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client: any;
  client_id=process.env.CLIENT_ID;
  client_secret=process.env.CLIENT_SECRET;
  redirect_uris=process.env.REDIRECT_URIS;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      this.client_id,
      this.client_secret,
      this.redirect_uris
    );
  }

  generateAuthUrl() {
    const scopes = ['https://www.googleapis.com/auth/calendar'];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      redirect_uri: 'http://localhost:4006/google-calendar/oauth2callback'
    });
  }

  async setCredentials(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
    } catch (error) {
      console.error('Error setting credentials:', error);
      throw new Error('Error setting credentials');
    }
  }

  async getEvents(email: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    try {
      const events = await calendar.events.list({
        calendarId: email,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      return events.data.items;
    } catch (error) {
      console.error('Error retrieving events:', error);
      throw new Error('Error retrieving events');
    }
  }

  async addEvent(email: string, event: EventDto) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !event) {
      throw new Error('Missing required parameters');
    }
    try {
      await calendar.events.insert({
        calendarId: email,
        requestBody: event,
      });
    } catch (error) {
      console.error('Error inserting event:', error);
      throw new Error('Error inserting event');
    }
  }

  async updateEvent(email: string, eventId: string, updatedEvent: Partial<EventDto>) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    try {
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
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('Error updating event');
    }
  }
  
  

  async getEventById(email: string, eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !eventId) {
      throw new Error('Missing required parameters');
    }
    try {
      const event = await calendar.events.get({
        calendarId: email,
        eventId: eventId,
      });
      return event.data;
    } catch (error) {
      console.error('Error retrieving event:', error);
      throw new Error('Error retrieving event');
    }
  }

  async deleteEvent(email: string, eventId: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    if (!email || !eventId) {
      throw new Error('Missing required parameters');
    }
    try {
      await calendar.events.delete({
        calendarId: email,
        eventId: eventId,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Error deleting event');
    }
  }
}