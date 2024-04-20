import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
  @ApiProperty({ description: 'Name', example: 'Random Random' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email that will be used to login',
    example: 'random@random.com',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsOptional()
  @IsString()
  validated?: boolean;
}
