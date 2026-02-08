import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { CreateHabitLogDto, CheckinDto } from './habit-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('habits/:habitId/logs')
@UseGuards(JwtAuthGuard)
export class HabitLogsController {
  constructor(private readonly habitLogsService: HabitLogsService) {}

  @Post()
  create(
    @Param('habitId') habitId: string,
    @Body() createHabitLogDto: CreateHabitLogDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.habitLogsService.create(req.user.userId.toString(), habitId, createHabitLogDto);
  }

  @Get()
  findByHabit(@Param('habitId') habitId: string, @Request() req: AuthenticatedRequest) {
    return this.habitLogsService.findByHabit(req.user.userId.toString(), habitId);
  }

  @Post('checkin')
  checkin(
    @Param('habitId') habitId: string,
    @Body() checkinDto: CheckinDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.habitLogsService.checkin(req.user.userId.toString(), habitId, checkinDto.date);
  }

  @Delete()
  remove(
    @Param('habitId') habitId: string,
    @Query('date') date: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.habitLogsService.remove(req.user.userId.toString(), habitId, date);
  }
}
