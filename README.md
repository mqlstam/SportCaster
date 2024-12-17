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
  "framework": "Angular 19.0.4",
  "ui": "Angular Material 19.0.3",
  "styling": "Tailwind CSS 3.4.16",
  "dependencies": {
    "rxjs": "7.8.1",
    "zone.js": "0.15.0"
  }
}
```

### Backend
```json
{
  "runtime": "Node.js",
  "framework": "Express 4.21.2",
  "database": "MongoDB 8.9.1",
  "security": "Helmet 8.0.0"
}
```

## 💻 Setup

1. **Prerequisites**
```bash
# Required tools
- Node.js 20.11.1
- Git
- Docker Desktop
- VS Code (recommended)
```

2. **Installation**
```bash
# Clone repository
git clone https://github.com/your-org/sportcaster.git
cd sportcaster

# Frontend setup
cd frontend
npm install
npm start

# Backend setup
cd ../backend
npm install
npm run dev
```

## 🔧 Development

### Structure
```
sportcaster/
├── frontend/         # Angular application
├── backend/          # Node.js API
├── documentation/    # Project documentation
│   ├── architecture/
│   └── database/
└── docker/          # Docker configurations
```

### Available Scripts

**Frontend:**
```bash
npm start     # Start development server
npm run build # Build production version
npm test      # Run tests
```

**Backend:**
```bash
npm run dev   # Start development server
npm run build # Build TypeScript
npm start     # Run production server
npm test      # Run tests
```

## 📚 Documentation
Project documentation, including architecture diagrams and database schemas, can be found in the `/documentation` directory:
- System Architecture: `/documentation/architecture/system-architecture-overview.drawio`
- Database Schema: `/documentation/database/erd-schema.drawio`

## 🛠️ Required VS Code Extensions
- Angular Language Service
- ESLint
- Prettier
- Docker
- MongoDB

---

<div align="center">

**Made with ☔️ by Team SportCaster** | Avans Hogeschool

</div>