import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatalogProductOutputDto {
  @ApiProperty({ description: 'Name', example: 'Random Random' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description', example: 'Random Random' })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Alt',
    example: 'random',
  })
  alt: string;

  @ApiProperty({ description: 'Image ID' })
  imageId: string;
}
