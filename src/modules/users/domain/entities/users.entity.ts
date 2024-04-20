import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  validated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
