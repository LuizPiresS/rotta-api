import { Module } from '@nestjs/common';
import { FileUploadModule } from '../../common/file-upload/file-upload.module';
import { LoggerModule } from '../../common/loggers/logger.module';
import { CatalogProducstsService } from './domain/catalog-products.service';
import { PrismaClient } from '@prisma/client';
import { CatalogProductssRepository } from './domain/repositories/catalog-products.repository';
import { LoggerService } from '../../common/loggers/domain/logger.service';
import { UploadService } from '../../common/file-upload/domain/upload.service';
import { CatalogProductsController } from './presentation/controllers/catalog-product.controller';
import { UploadRepository } from '../../common/file-upload/domain/repositories/upload.repository';

@Module({
  imports: [FileUploadModule, LoggerModule],
  providers: [
    CatalogProducstsService,
    PrismaClient,
    {
      provide: 'ICatalogProductsRepository',
      useClass: CatalogProductssRepository,
    },
    { provide: 'ILoggerService', useClass: LoggerService },
    { provide: 'IFileUploadService', useClass: UploadService },
    { provide: 'IUploadRepository', useClass: UploadRepository },
  ],
  controllers: [CatalogProductsController],
})
export class CatalogProductModule { }
