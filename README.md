<div align="center">

# 🌤️ SportCaster

A smart sports recommendation system powered by real-time weather data


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

## 💻 Development Setup

1. **Prerequisites**
```bash
# Required tools
- Docker Desktop
- Git
```

2. **Project Structure**
```
SportCaster/
├── docker/               # Docker configurations
├── frontend/            # Angular application
├── backend/             # Node.js API
└── documentation/       # Project documentation
```

3. **Installation & Running**
```bash
# Clone repository
git clone https://github.com/mqlstm/sportcaster.git
cd sportcaster

# Start all services with Docker
cd docker
docker-compose up
```

4. **Access Points**
```json
{
  "frontend": "http://localhost:4200",
  "backend": "http://localhost:3000",
  "mongodb": "mongodb://localhost:27017"
}
```

## 📁 Frontend Structure
```
frontend/src/app/
├── core/
│   ├── services/
│   └── guards/
├── shared/
│   ├── components/
│   └── models/
├── features/
│   ├── weather/
│   └── sports/
└── layout/
    ├── header/
    └── footer/
```

## 📚 Documentation
Project documentation can be found in the `/documentation` directory:
- System Architecture: `/documentation/architecture/system-architecture-overview.drawio`
- Database Schema: `/documentation/database/erd-schema.drawio`

## 🛠️ Recommended VS Code Extensions
- Angular Language Service
- Docker
- MongoDB for VS Code
- Draw.io Integration

---

<div align="center">

**Made with ☔️ by Team SportCaster** | Avans Hogeschool

</div>
