import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../../domain/users.service';
import { User } from '.prisma/client';
import { UserInputDto } from '../dtos/user.input.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserOutputDto } from '../dtos/user.output.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(private readonly tenantsService: UsersService) { }

  @Post()
  async createUser(@Body() input: UserInputDto): Promise<UserOutputDto> {
    return this.tenantsService.createUser(input);
  }
}
