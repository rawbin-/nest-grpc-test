import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
  // 添加 gRPC 服务
  app.connectMicroservice(
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:6000', // gRPC 服务的地址和端口
        package: 'hello', // proto 文件中的 package 名称
        protoPath: join(__dirname, '../proto/hello.proto'), // proto 文件路径
        loader: {
          defaults: false,
          arrays: true,
          objects: true,
          json: true,
        },
      },
    },
    {
      inheritAppConfig: true, // HTTP应用的各种配置，比如中间件拦截器等
    },
  );

  // 启动 gRPC 服务
  await app.startAllMicroservices();
}

bootstrap();
