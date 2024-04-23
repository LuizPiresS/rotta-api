import { Module } from '@nestjs/common';
import { UploadService } from './domain/upload.service';
import { FilesController } from './presentation/controllers/upload.controller';
import { UploadRepository } from './domain/repositories/upload.repository';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../loggers/domain/logger.service';

@Module({
  providers: [
    PrismaClient,
    { provide: 'IUploadRepository', useClass: UploadRepository },
    { provide: 'ILoggerService', useClass: LoggerService },
    UploadService,
  ],
  controllers: [FilesController],
})
export class FileUploadModule { }
