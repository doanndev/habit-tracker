import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AuthenticatedRequest {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(
    @Body() createHabitDto: CreateHabitDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.habitsService.create(
      req.user.userId.toString(),
      createHabitDto,
    );
  }

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.habitsService.findAll(req.user.userId.toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.habitsService.findOne(id, req.user.userId.toString());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.habitsService.update(
      id,
      req.user.userId.toString(),
      updateHabitDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.habitsService.remove(id, req.user.userId.toString());
  }
}
