import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('habits/:habitId/stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  getHabitStats(@Param('habitId') habitId: string, @Request() req: AuthenticatedRequest) {
    return this.statsService.getHabitStats(req.user.userId.toString(), habitId);
  }
}
