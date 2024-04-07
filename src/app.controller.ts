
import { Controller, Get } from '@nestjs/common';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly rabbitPublisherService: RabbitPublisherService) {}

  @Get('publish-message')
  async publishMessage() {
    const message = {
      "pattern": "message_exchange",
      "data": {
        "id": 3,
        "name": "רחלי",
        "email": "r4566@gmail.com",
        "message": "Hello racheli to RabbitMQ!"
      }
    };
 
    await this.rabbitPublisherService.publishMessageToCommunication(message);
    return 'Message published successfully';
  }
}