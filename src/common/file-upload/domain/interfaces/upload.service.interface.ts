import { Request } from 'express';

export interface IUploadService {
  uploadFile(file: Express.Multer.File, req: Request);
}
