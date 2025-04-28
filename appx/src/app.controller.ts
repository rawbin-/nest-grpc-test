import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/good')
  @GrpcMethod('AppService', 'good')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/great')
  @GrpcMethod('AppService', 'great')
  getResp(): Record<string, any> {
    return this.appService.getResp();
  }
}
