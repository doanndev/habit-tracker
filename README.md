# HabitTracker 🏃‍♂️

A modern, web-first habit tracking application built with Next.js and NestJS. Track your daily habits, build streaks, and visualize your progress with beautiful analytics.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with guest mode support
- **Habit Management**: Create, edit, and manage your daily/weekly habits
- **Daily Check-ins**: Simple one-click habit tracking with visual feedback
- **Streak Tracking**: Monitor current and longest streaks for motivation
- **Visual Analytics**: Beautiful heatmap visualization of your habit progress
- **Statistics Dashboard**: Completion rates, streak analytics, and progress insights
- **Responsive Design**: Modern UI that works perfectly on desktop and mobile
- **Dark Mode**: Eye-friendly dark theme support

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │    NestJS       │
│   Frontend      │◄──►│   Backend       │
│   (Port 3000)   │    │   (Port 3001)   │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  PostgreSQL     │    │     Redis       │
│   Database      │    │    Cache        │
│   (Port 5432)   │    │   (Port 6379)   │
└─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd habit-tracker
   ```

2. **Start Docker services**

   ```bash
   docker-compose up -d
   ```

3. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the development servers**

   **Backend (Terminal 1):**

   ```bash
   cd backend
   npm run start:dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
habit-tracker/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── habits/         # Habit management
│   │   ├── habit-logs/     # Daily check-ins
│   │   ├── stats/          # Statistics calculations
│   │   ├── users/          # User management
│   │   └── app.module.ts
│   ├── package.json
│   └── dockerfile
├── frontend/                # Next.js application
│   ├── app/                # Next.js 14 app router
│   ├── components/         # React components
│   ├── context/            # React context providers
│   ├── pages/              # Page components
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   └── package.json
├── docker-compose.yml       # Docker services
├── SPEC.md                  # Project specifications
├── WORKFLOW.md             # Development workflow
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Cache**: Redis
- **Language**: TypeScript

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Language**: TypeScript
- **UI Components**: Custom components with modern design

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL
- **Cache**: Redis
- **API**: RESTful API

## 🔧 Development

### Available Scripts

**Backend:**

```bash
npm run start:dev      # Development server with hot reload
npm run build         # Build for production
npm run test          # Run tests
npm run lint          # Run ESLint
```

**Frontend:**

```bash
npm run dev           # Development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (.env):**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/habittracker
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://localhost:6379
```

**Frontend (.env.local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📊 API Documentation

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Habits

- `GET /habits` - Get user's habits
- `POST /habits` - Create new habit
- `PUT /habits/:id` - Update habit
- `DELETE /habits/:id` - Delete habit

### Habit Logs

- `POST /habits/:id/logs/checkin` - Check in for today
- `GET /habits/:id/logs` - Get habit logs

### Statistics

- `GET /habits/:id/stats` - Get habit statistics

## 🎨 UI Components

The application features a modern, clean design with:

- **Responsive Layout**: Works on all screen sizes
- **Dark/Light Mode**: Theme switching support
- **Interactive Heatmap**: GitHub-style activity visualization
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessible Design**: WCAG compliant components

## 🔒 Security

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- HTTPS in production

## 🚀 Deployment

### Production Build

1. **Build the applications:**

   ```bash
   # Backend
   cd backend && npm run build

   # Frontend
   cd frontend && npm run build
   ```

2. **Start production services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment Setup

- Set production environment variables
- Configure reverse proxy (nginx)
- Set up SSL certificates
- Configure database backups

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by habit tracking applications like Habitica and Loop Habit Tracker
- Built with modern web technologies for optimal performance
- Designed for users who want simple, effective habit building tools

---

**Happy habit tracking! 🎯**</content>
<parameter name="filePath">/Users/doanndev/personal/habit-tracker/README.md
