import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../generated/prisma/enums';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@Auth(Role.MANAGER)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('summary')
  summary() {
    return this.dashboard.getSummary();
  }
}
