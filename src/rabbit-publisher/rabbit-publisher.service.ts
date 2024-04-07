
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';


@Injectable()
export class RabbitPublisherService {
 private connection: amqp.Connection;
 private channel: amqp.Channel;

 constructor(private configService: ConfigService) {
 this.connectToRabbitMQ();
}

async connectToRabbitMQ() {

  const amqpUrl = `amqp://${this.configService.get('AMQP_HOST')}:${this.configService.get('AMQP_PORT')}`;
  const username = this.configService.get('AMQP_USERNAME');
  const password = this.configService.get('AMQP_PASSWORD');

  this.connection = await amqp.connect(amqpUrl, {
    username,
    password,
  });

 this.channel = await this.connection.createChannel();

 await this.initializeRabbitMQ();
 }

 async initializeRabbitMQ(): Promise<void> {
  await this.channel.assertExchange('message_exchange', 'direct', { durable: false });
  await this.channel.assertQueue('message_queue', { durable: true });
  await this.channel.bindQueue('message_queue', 'message_exchange', 'message_type');
}


 async publishMessageToCommunication (message: any): Promise<void> {
 
  try{
    const exchangeName =message.pattern;
    const messageData=JSON.stringify(message.data);

      this.channel.publish(exchangeName, 'message_type', Buffer.from(messageData));
      console.log(`Message published to exchange :  ${exchangeName} `); 
     
  }

 catch(error){
    console.error(`Message not published with routing key ${error} `);
 }

 }


}


