import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'good';
  }

  getResp(): Record<string, any> {
    return {
      nullValue: null,
      undefinedValue: undefined,
      zeroValue: 0,
      message: 'great',
    };
  }
}
