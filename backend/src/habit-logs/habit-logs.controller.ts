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

@Controller('habits/:habitId/logs')
@UseGuards(JwtAuthGuard)
export class HabitLogsController {
  constructor(private readonly habitLogsService: HabitLogsService) {}

  @Post()
  create(
    @Param('habitId') habitId: string,
    @Body() createHabitLogDto: CreateHabitLogDto,
  ) {
    return this.habitLogsService.create(habitId, createHabitLogDto);
  }

  @Get()
  findByHabit(@Param('habitId') habitId: string) {
    return this.habitLogsService.findByHabit(habitId);
  }

  @Post('checkin')
  checkin(@Param('habitId') habitId: string, @Body() checkinDto: CheckinDto) {
    return this.habitLogsService.checkin(habitId, checkinDto.date);
  }

  @Delete()
  remove(@Param('habitId') habitId: string, @Query('date') date: string) {
    return this.habitLogsService.remove(habitId, date);
  }
}
