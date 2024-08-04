import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { UseInterceptors } from '@nestjs/common';


// import { AuditLogInterceptor } from '

// ../../infrastructure/auditLog-middleware/audit-log.interceptor';
//  @UseInterceptors(AuditLogInterceptor) @Controller



export class AppController {
  constructor(
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly appService: AppService,
  ) {}

  @Get('hello')
  @UseGuards(AuthGuard('jwt'))
  getHello(@Request() req): string {
    return this.appService.getHello();
  }
}
