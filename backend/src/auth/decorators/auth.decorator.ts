import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import type { Role } from '../../generated/prisma/enums';
import { AuthGuard } from '../guards/auth.guard';
import { ROLES_KEY, RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
