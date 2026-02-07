# HabitKit Clone – Web-first Project Documentation

## 1. Business Analysis

### 1.1 Problem Statement

Users want to build and maintain habits through simple, visual, and consistent tracking without unnecessary complexity.

**Value proposition**:

> Help users build discipline through simple habit tracking with clear visual feedback.

---

## 1.2 Target Persona

- Knowledge workers / students
- Daily web users
- Prefer minimal UI
- Motivated by streaks and progress visualization

---

## 1.3 Scope

### In-scope (MVP)

- User authentication
- Habit management
- Daily check-in
- Streak calculation
- Grid visualization

### Out-of-scope (Phase 2+)

- Social features
- Gamification
- Automatic tracking
- AI coaching

---

## 2. Functional Specification

### 2.1 User Management

- Register / Login
- Optional guest mode
- Profile management

### 2.2 Habit Management

**Habit fields**
| Field | Description |
|------|------------|
| name | Habit name |
| frequency | daily / weekly |
| start_date | Start tracking date |
| color | UI color |
| status | active / archived |

### 2.3 Habit Tracking

- User manually checks in per day
- One log per habit per day
- Editable history (MVP)

### 2.4 Statistics

- Current streak
- Longest streak
- Completion rate

---

## 3. Domain Model

### 3.1 Entities

```
User
 └── Habit
       └── HabitLog
```

---

## 3.2 Database Schema (PostgreSQL)

### users

```sql
id UUID PK
email VARCHAR UNIQUE
password_hash TEXT
created_at TIMESTAMP
```

### habits

```sql
id UUID PK
user_id UUID FK
name VARCHAR
frequency VARCHAR
start_date DATE
color VARCHAR
is_archived BOOLEAN
created_at TIMESTAMP
```

### habit_logs

```sql
id UUID PK
habit_id UUID FK
date DATE
status VARCHAR
UNIQUE(habit_id, date)
```

---

## 4. System Architecture

### 4.1 High-level Architecture

```
Browser
 ↓
Next.js (Frontend)
 ↓ REST API
NestJS (Backend)
 ↓
PostgreSQL
 ↓
Redis (Cache)
```

---

## 5. Backend Architecture

### 5.1 Layered Design

```
Controller
Service
Domain
Repository
```

### 5.2 Modules

- AuthModule
- UserModule
- HabitModule
- HabitLogModule
- StatsModule

---

## 6. API Design (REST)

### Create habit

```
POST /api/habits
```

### Check-in habit

```
POST /api/habits/{id}/checkin
Body: { date }
```

### Get habit logs

```
GET /api/habits/{id}/logs?from=&to=
```

---

## 7. Frontend Architecture

### Pages

- /login
- /dashboard
- /habit/:id

### Components

- HabitGrid
- HabitCard
- StreakBadge
- CheckButton

---

## 8. DevOps & Deployment

### Stack

- Docker
- Docker Compose
- Nginx
- VPS (DigitalOcean / Azure)

### Containers

- frontend
- backend
- postgres
- redis

---

## 9. Non-functional Requirements

| Category    | Requirement     |
| ----------- | --------------- |
| Performance | <200ms API      |
| Security    | JWT, HTTPS      |
| Scalability | Stateless API   |
| Backup      | Daily DB backup |

---

## 10. Roadmap

### Phase 1 – MVP

- Core tracking
- Grid UI
- Auth

### Phase 2

- AI habit coach
- Predict streak breaks

### Phase 3

- Mobile app (React Native)

---

## 11. Project Name

- HabitTracker
