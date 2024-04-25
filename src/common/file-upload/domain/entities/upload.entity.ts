import { FileUpload } from '@prisma/client';

export class UploadEntity implements FileUpload {
  id: string;
  fileName: string;
  contentLength: number;
  contentType: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
