<div align="center">

# 🌤️ SportCaster

A smart sports recommendation system powered by real-time weather data

[Overview](#overview) • [Features](#features) • [Setup](#setup) • [Development](#development) • [Team](#team)

</div>

---

## Overview

SportCaster helps users choose the perfect sport activity based on current weather conditions and personal preferences. Using real-time weather data, user preferences, and smart recommendations, we make it easy to stay active in any weather.

## 🚀 Features

- 🌡️ Real-time weather integration
- 🎯 Personalized sport recommendations
- 👤 User preference management
- 📱 Responsive design
- 🔒 Secure authentication

## 🛠️ Tech Stack

### Frontend
```json
{
  "framework": "Angular 19.0.x",
  "ui": "Angular Material",
  "state": "NgRx",
  "styling": "Tailwind CSS 3.3.3"
}
```

### Backend
```json
{
  "runtime": "Node.js 20.11.1",
  "framework": "Express 5.0.0",
  "auth": "JWT",
  "docs": "Swagger"
}
```

### Database & Tools
```json
{
  "database": "MongoDB 7.0",
  "orm": "Mongoose 7.5.0",
  "containerization": "Docker"
}
```

## 💻 Setup

1. **Prerequisites**
```bash
# Required tools
- Docker Desktop
- Node.js 20.11.1
- Git
```

2. **Installation**
```bash
# Clone repository
git clone https://github.com/your-org/sportcaster.git
cd sportcaster

# Setup environment
cp .env.example .env

# Start containers
docker-compose up -d
```

3. **Access Points**
```json
{
  "frontend": "http://localhost:4200",
  "backend": "http://localhost:3000",
  "api-docs": "http://localhost:3000/api-docs"
}
```

## 🔧 Development

### Local Development
```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm run dev
```

### Testing
```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 📁 Project Structure
```
sportcaster/
├── frontend/     # Angular application
│   ├── src/
│   └── tests/
├── backend/      # Node.js API
│   ├── src/
│   └── tests/
├── docker/       # Docker configurations
├── docs/         # Documentation
└── README.md
```

## 🛠️ Tools & Extensions

### VS Code Extensions
- Angular Language Service
- ESLint
- Prettier
- Docker
- MongoDB

## 👥 Team

### Frontend Developers
- [Name 1]
- [Name 2]

### Backend Developer
- [Name 3]

### DevOps Engineer
- [Name 4]

## 📝 Contributing

1. Create feature branch from development
2. Make changes
3. Create pull request
4. Ensure tests pass
5. Request review

---

<div align="center">

**Made with ☔️ by Team [X]** | Avans University

</div>
