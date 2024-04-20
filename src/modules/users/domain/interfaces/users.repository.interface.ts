import { IBaseRepository } from '../../../../common/base-repository/interfaces/base.repository.interface';
import { User } from '@prisma/client';

export type IUsersRepository = IBaseRepository<User>;
