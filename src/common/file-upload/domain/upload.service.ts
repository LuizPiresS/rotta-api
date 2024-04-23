import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { IUploadRepository } from './interfaces/upload.repository.interface';
import { ILoggerService } from '../../loggers/domain/interfaces/logger-service.interface';

@Injectable()
export class UploadService {
  constructor(
    @Inject('IUploadRepository')
    private readonly uploadRepository: IUploadRepository,
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
  ) { }
  async uploadFile(file: Express.Multer.File, req: Request) {
    console.log(file);
    return await this.uploadRepository.create({
      fileName: file.filename,
      contentLength: file.size,
      contentType: file.mimetype,
      url: `${req.protocol}://${req.get('host')}/files/${file.filename}`,
    });
  }
}
