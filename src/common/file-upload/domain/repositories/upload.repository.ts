import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../base-repository/base-repository';
import { FileUpload } from '@prisma/client';
import { IUploadRepository } from '../interfaces/upload.repository.interface';

@Injectable()
export class UploadRepository
  extends BaseRepository<FileUpload>
  implements IUploadRepository {
  protected getModelName(): string {
    return 'fileUpload';
  }
}
