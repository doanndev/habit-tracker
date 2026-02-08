
import React from 'react';

export const HABIT_COLORS = [
  '#19a1e6', // Primary Blue
  '#fb7185', // Rose
  '#fbbf24', // Amber
  '#34d399', // Emerald
  '#818cf8', // Indigo
  '#a78bfa', // Purple
  '#f472b6', // Pink
  '#fb923c', // Orange
];

export const APP_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];

export const TRANSLATIONS: Record<string, any> = {
  en: {
    appName: 'HabitPulse',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Build habits, one day at a time.',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    signInBtn: 'Sign In',
    continueGuest: 'Continue as Guest',
    todaysHabits: "Today's Habits",
    habitAnalytics: 'Habit Analytics',
    editHabit: 'Edit Habit',
    saveHabit: 'Save Habit',
    cancel: 'Cancel',
    habitNameLabel: 'Habit Name',
    frequencyLabel: 'Frequency',
    startDateLabel: 'Start Date',
    chooseColor: 'Choose a color',
    currentStreak: 'Current Streak',
    longestStreak: 'Longest Streak',
    completionRate: 'Completion Rate',
    activityHistory: 'Activity History (Last 6 Months)',
    less: 'Less',
    more: 'More',
    checkIn: 'Check-In',
    logout: 'Logout',
    level: 'Level',
    noHabits: 'No habits yet. Start your journey!',
    newHabit: 'New Habit',
  },
  vi: {
    appName: 'HabitPulse',
    loginTitle: 'Chào mừng trở lại',
    loginSubtitle: 'Xây dựng thói quen, từng ngày một.',
    emailLabel: 'Địa chỉ Email',
    passwordLabel: 'Mật khẩu',
    signInBtn: 'Đăng nhập',
    continueGuest: 'Tiếp tục với khách',
    todaysHabits: 'Thói quen hôm nay',
    habitAnalytics: 'Phân tích thói quen',
    editHabit: 'Sửa thói quen',
    saveHabit: 'Lưu thói quen',
    cancel: 'Hủy',
    habitNameLabel: 'Tên thói quen',
    frequencyLabel: 'Tần suất',
    startDateLabel: 'Ngày bắt đầu',
    chooseColor: 'Chọn màu sắc',
    currentStreak: 'Chuỗi hiện tại',
    longestStreak: 'Chuỗi dài nhất',
    completionRate: 'Tỷ lệ hoàn thành',
    activityHistory: 'Lịch sử hoạt động (6 tháng qua)',
    less: 'Ít hơn',
    more: 'Nhiều hơn',
    checkIn: 'Điểm danh',
    logout: 'Đăng xuất',
    level: 'Cấp độ',
    noHabits: 'Chưa có thói quen nào. Hãy bắt đầu hành trình!',
    newHabit: 'Thói quen mới',
  }
};
