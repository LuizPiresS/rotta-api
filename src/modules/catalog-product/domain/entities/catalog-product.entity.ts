import { CatalogProduct } from '@prisma/client';

export class CatalogProductEntity implements CatalogProduct {
  id: string;
  name: string;
  description: string;
  alt: string;
  createdAt: Date;
  updatedAt: Date;
  fileUploadId: string;
}
