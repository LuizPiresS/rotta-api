import { Inject, Injectable } from '@nestjs/common';
import { CatalogProductInputDto } from '../presentation/dtos/catalog-product.input.dto';
import { ILoggerService } from '../../../common/loggers/domain/interfaces/logger-service.interface';
import { ConfigService } from '@nestjs/config';
import { ICatalogProductsRepository } from './interfaces/catalog-products.repository.interface';
import { IUploadService } from '../../../common/file-upload/domain/interfaces/upload.service.interface';
import { Request } from 'express';
import { CatalogProductOutputDto } from '../presentation/dtos/catalog-product.output.dto';
import { CatalogProduct } from '@prisma/client';

@Injectable()
export class CatalogProducstsService {
  constructor(
    @Inject('ICatalogProductsRepository')
    private readonly catalogProductsRepository: ICatalogProductsRepository,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('IFileUploadService')
    private readonly fileUploadService: IUploadService,
    private readonly configService: ConfigService,
  ) { }

  async createProduct(
    input: CatalogProductInputDto,
    req: Request,
    file: Express.Multer.File,
  ) {
    const newImage = await this.fileUploadService.uploadFile(file, req);
    const newProduct = await this.catalogProductsRepository.create({
      ...input,
      fileUploadId: newImage.id,
    });

    return this.newProductToProductCatalogOutPut(newProduct, newImage);
  }

  private async newProductToProductCatalogOutPut(
    productData: CatalogProduct,
    imageData,
  ): Promise<CatalogProductOutputDto> {
    return {
      description: productData.description,
      alt: productData.alt,
      imageId: imageData.id,
    };
  }
}
