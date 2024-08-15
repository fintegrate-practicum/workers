import { Module } from '@nestjs/common';
import { GoogleCalendarController } from '../controller/google-calendar.controller';
import { GoogleCalendarService } from '../service/google-calendar.service';
@Module({
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService]
})
export class GoogleCalendarModule {}