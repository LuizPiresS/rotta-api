//files.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { UploadService } from '../../domain/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../../../config/upload.config';
import { Request } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Upload')
@ApiConsumes('multipart/form-data')
export class FilesController {
  constructor(private readonly filesService: UploadService) { }

  @ApiBearerAuth('JWT')
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesService.uploadFile(file, req);
  }
}
