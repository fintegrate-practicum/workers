import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly appService: AppService,
  ) {}

  @Get('hello')
  @UseGuards(AuthGuard('jwt'))
  getHello(@Request() req): string {
    console.log(req);

    console.log(req.user.id);
    return this.appService.getHello();
  }
}
