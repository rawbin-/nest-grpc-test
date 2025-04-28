import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('string')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getResp(): Record<string, any> {
    return this.appService.getResp();
  }
}
