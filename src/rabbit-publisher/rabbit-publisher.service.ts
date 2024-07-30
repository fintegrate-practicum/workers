import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class RabbitPublisherService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly nameExchange: string = 'message_exchange';
  private readonly nameQueue: string = 'message_queue';

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connectToRabbitMQ();
    console.log('connected to rabbit');
  }

 async connectToRabbitMQ() {
    try {
      const amqpUrl = this.configService.get('AMQP_URL');
      const username = this.configService.get('AMQP_USERNAME');
      const password = this.configService.get('AMQP_PASSWORD');

      this.connection = await new Promise<amqp.Connection>((resolve, reject) => {
        amqp.connect(amqpUrl, { username, password }, (err, conn) => {
          if (err) {
            reject(err);
          } else {
            resolve(conn);
          }
        });
      });

      this.channel = await this.connection.createChannel();
      await this.initializeRabbitMQ();
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error; 
    }
  }

   async initializeRabbitMQ(): Promise<void> {
    try {
      await this.channel.assertExchange(this.nameExchange, 'direct', { durable: false });
      await this.channel.assertQueue(this.nameQueue, { durable: true });
      await this.channel.bindQueue(this.nameQueue, this.nameExchange, 'message_type');
    } catch (error) {
      console.error('Error initializing RabbitMQ:', error);
      throw error; 
    }
  }

  async publishMessageToCommunication(message: any): Promise<void> {
    try {
      const exchangeName = message.pattern;
      const messageData = JSON.stringify(message);

      this.channel.publish(exchangeName, 'message_type', Buffer.from(messageData));
      console.log(`Message published to exchange: ${exchangeName}`);
    } catch (error) {
      console.error(`Message not published: ${error}`);
      throw error; 
    }
  }
}
