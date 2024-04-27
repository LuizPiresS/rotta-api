import { Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  fullName: string;
  verified: boolean;
  activated: boolean;
  roles: Prisma.JsonValue;
  deletedAt: Date;
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  validated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
