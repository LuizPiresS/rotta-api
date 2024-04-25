import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Headers,
  Body,
} from '@nestjs/common';
import { CatalogProducstsService } from '../../domain/catalog-products.service';
import { CatalogProductInputDto } from '../dtos/catalog-product.input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatalogProductOutputDto } from '../dtos/catalog-product.output.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../../../common/config/upload.config';

@ApiTags('Catalog Products')
@Controller('catalog-products')
@ApiBearerAuth('JWT')
export class CatalogProductsController {
  constructor(
    private readonly catalogProductService: CatalogProducstsService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createProduct(
    @Body() input: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CatalogProductOutputDto> {
    return this.catalogProductService.createProduct(input, req, file);
  }
}
