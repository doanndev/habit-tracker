import { IsDateString, IsOptional } from 'class-validator';

export class CreateHabitLogDto {
  @IsDateString()
  date: string;

  @IsOptional()
  status?: string = 'completed';
}

export class CheckinDto {
  @IsDateString()
  date: string;
}
