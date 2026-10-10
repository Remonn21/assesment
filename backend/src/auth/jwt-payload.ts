import type { Role } from '../generated/prisma/enums';

export interface JwtPayload {
  sub: string;
  name: string;
  role: Role;
}
