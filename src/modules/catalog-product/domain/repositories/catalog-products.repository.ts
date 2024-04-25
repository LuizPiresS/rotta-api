import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { CatalogProduct } from '@prisma/client';
import { ICatalogProductsRepository } from '../interfaces/catalog-products.repository.interface';

@Injectable()
export class CatalogProductssRepository
  extends BaseRepository<CatalogProduct>
  implements ICatalogProductsRepository {
  protected getModelName(): string {
    return 'catalogProduct';
  }
}
