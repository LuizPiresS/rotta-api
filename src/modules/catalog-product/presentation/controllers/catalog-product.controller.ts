import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CatalogProducstsService } from '../../domain/catalog-products.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
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
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async createProduct(
    @Body() input: any,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CatalogProductOutputDto> {
    return this.catalogProductService.createProduct(input, req, file);
  }

  @Get()
  public async listAllProducts() {
    return this.catalogProductService.listAllProducts();
  }

  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Patch(':id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() input: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.catalogProductService.updateProduct(id, input, req, file);
  }

  @Delete(':id')
  public async deleteProduct(@Param('id') id: string) {
    return this.catalogProductService.deleteProduct(id);
  }
}
