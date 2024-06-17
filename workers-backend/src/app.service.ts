import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  public readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }
}
