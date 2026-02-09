
export type Frequency = 'daily' | 'weekly';

export interface HabitLog {
  date: string; // ISO format: YYYY-MM-DD
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: Frequency;
  startDate: string;
  color: string;
  logs: HabitLog[];
}

export interface User {
  email: string
  avatar: string;
  level: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'vi';

export interface TranslationKeys {
  appName: string;
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  signInBtn: string;
  continueGuest: string;
  todaysHabits: string;
  habitAnalytics: string;
  editHabit: string;
  saveHabit: string;
  cancel: string;
  habitNameLabel: string;
  frequencyLabel: string;
  startDateLabel: string;
  chooseColor: string;
  currentStreak: string;
  longestStreak: string;
  completionRate: string;
  activityHistory: string;
  less: string;
  more: string;
  checkIn: string;
  logout: string;
  level: string;
  noHabits: string;
  newHabit: string;
}
