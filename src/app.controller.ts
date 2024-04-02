import { Controller, Get } from '@nestjs/common';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';

@Controller()
export class AppController {
  constructor(private readonly rabbitPublisherService: RabbitPublisherService) {}

  @Get('publish-message')
  async publishMessage() {
    const message = { task_id: 123, task_data: 'Perform task A' };
    // await this.rabbitPublisherService.publishMessage('my_routing_key', message);
    return 'Message published successfully';
  }
}
