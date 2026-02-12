# Habit Tracker

## Overview
The Habit Tracker project is a web application designed to help users track their habits and improve their productivity. It consists of a backend service and a frontend interface, both of which are containerized using Docker.

## Project Structure
```
habit-tracker
├── .github
│   └── workflows
│       └── build-and-push.yml  # GitHub Actions workflow for CI/CD
├── backend
│   ├── Dockerfile                # Dockerfile for backend service
│   └── src
│       └── app.js               # Main application file for backend
├── frontend
│   ├── Dockerfile                # Dockerfile for frontend service
│   └── src
│       └── index.html            # Main HTML file for frontend
├── docker-compose.yml            # Docker Compose configuration
└── README.md                     # Project documentation
```

## Getting Started

### Prerequisites
- Docker installed on your machine
- Docker Hub account for pushing images

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/doanndev/habit-tracker.git
   cd habit-tracker
   ```

2. **Build and run the application:**
   You can use Docker Compose to build and run the application:
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   Open your web browser and navigate to `http://localhost:3000` to access the frontend.

### CI/CD with GitHub Actions
This project includes a GitHub Actions workflow located in `.github/workflows/build-and-push.yml`. This workflow is triggered on code pushes to the `main` branch. It automatically builds Docker images for both the backend and frontend and pushes them to Docker Hub using the configured secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.