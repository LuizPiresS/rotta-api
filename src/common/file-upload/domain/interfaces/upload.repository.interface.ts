import { IBaseRepository } from '../../../base-repository/interfaces/base.repository.interface';
import { FileUpload } from '@prisma/client';

export type IUploadRepository = IBaseRepository<FileUpload>;
