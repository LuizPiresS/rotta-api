import { FileUpload } from '@prisma/client';

export class UploadEntity implements FileUpload {
  id: string;
  fileName: string;
  contentType: string;
  contentLength: number;
  url: string;
}
