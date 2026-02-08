import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtMiddleware } from './auth/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { HabitsModule } from './habits/habits.module';
import { HabitLogsModule } from './habit-logs/habit-logs.module';
import { StatsModule } from './stats/stats.module';
import { User } from './users/user.entity';
import { Habit } from './habits/habit.entity';
import { HabitLog } from './habit-logs/habit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'habit_tracker',
      entities: [User, Habit, HabitLog],
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    HabitsModule,
    HabitLogsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply JWT middleware to protected routes. These routes expect a Bearer token in Authorization header.
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'habits', method: RequestMethod.ALL },
        { path: 'habits/:habitId/logs', method: RequestMethod.ALL },
        { path: 'stats', method: RequestMethod.ALL },
      );
  }
}

