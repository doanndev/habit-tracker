import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  frequency?: string = 'daily';

  @IsDateString()
  start_date: string;

  @IsOptional()
  color?: string = '#3B82F6';
}

export class UpdateHabitDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  frequency?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  color?: string;

  @IsOptional()
  is_archived?: boolean;
}
