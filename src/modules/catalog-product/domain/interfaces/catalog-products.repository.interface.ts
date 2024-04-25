import { IBaseRepository } from '../../../../common/base-repository/interfaces/base.repository.interface';
import { CatalogProduct } from '@prisma/client';

export type ICatalogProductsRepository = IBaseRepository<CatalogProduct>;
