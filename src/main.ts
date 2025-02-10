import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('APP_PORT') || 3000;
  const grpcUrl = configService.get<string>('GRPC_URL');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['user'],
      protoPath: [join(__dirname, './proto/user/user.proto')],
      url: grpcUrl,
    },
  });

  // Start both the microservice and the app (if needed)
  await app.startAllMicroservices();
  await app.listen(appPort);

  console.log(`Microservice is running on: ${grpcUrl}`);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
