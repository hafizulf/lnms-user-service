import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, ValidationError, UnprocessableEntityException } from '@nestjs/common';

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

  // Start the microservice app
  await app.startAllMicroservices();

  // start the app
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables transformation to class instance
      whitelist: true, // Removes all fields that are not in the DTO
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException({
          statusCode: 422,
          message: 'Validation errors',
          errors: errors.map((error) => ({
            field: error.property,
            constraints: error.constraints,
          })),
        });
      },
    }),
  );

  await app.listen(appPort);

  console.log(`Microservice is running on: ${grpcUrl}`);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
