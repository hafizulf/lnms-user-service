import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { EnvValidationOptions, EnvValidationSchema } from './config/env-validation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
      validationOptions: EnvValidationOptions,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
