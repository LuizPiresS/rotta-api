import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation';
import { HashingModule } from './common/hashing/hashing.module';
import { LoggerModule } from './common/loggers/logger.module';
import { PrismaService } from './common/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { MailModule } from './common/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FileUploadModule } from './common/file-upload/file-upload.module';
import { CatalogProductModule } from './modules/catalog-product/catalog-product.module';
import AppConfig from './common/config/app.config';
import SwaggerConfig from './common/config/swagger.config';
import MailConfig from './common/config/mail.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [AppConfig, SwaggerConfig, MailConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    EventEmitterModule.forRoot(),
    LoggerModule,
    HashingModule,
    UsersModule,
    MailModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    FileUploadModule,
    FileUploadModule,
    CatalogProductModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
