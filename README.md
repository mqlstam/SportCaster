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
  "framework": "Angular 19",
  "ui": "Angular Material",
  "state": "NgRx",
  "styling": "Tailwind CSS"
}
```

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express",
  "auth": "JWT",
  "docs": "Swagger"
}
```

### Database & Tools
```json
{
  "database": "MongoDB",
  "orm": "Mongoose",
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


## 🛠️ Tools & Extensions

### VS Code Extensions
- Angular Language Service
- ESLint
- Prettier
- Docker
- MongoDB

---

<div align="center">

**Made with ☔️ by Team SportCaster** | Avans Hogeschool

</div>
