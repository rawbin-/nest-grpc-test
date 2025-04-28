import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return JSON.stringify({
      code: 0,
      statusCode: 1,
      message: 'Hello World!',
    });
  }

  getResp(): Record<string, any> {
    return {
      code: 0,
      statusCode: 1,
      message: 'Hello World!',
    };
  }
}
