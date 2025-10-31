import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client'; // usando o enum Role do Prisma

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
