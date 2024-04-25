import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatalogProductInputDto {
  @ApiProperty({ description: 'Description', example: 'Random Random' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Alt',
    example: 'random',
  })
  @IsString()
  alt: string;

  @ApiProperty({
    description: 'Image ID',
    example: 'random',
  })
  @IsOptional()
  @IsString()
  fileUploadId?: string | null;
}
