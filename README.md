# WalkSena MVP - Walk-In Form System

Production-ready MVP of the SENA walk-in customer form system.

## System Overview

A full-stack application for managing walk-in customer data collection:

- **Frontend**: React 19 + TypeScript with Ant Design UI components
- **Backend**: Node.js + Express API server
- **Database**: Google Sheets integration for data storage
- **Deployment**: Docker containerized deployment

## Docker Deployment

Run with Docker Compose:
```bash
docker-compose up -d
```

- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3000

## Quick Start

### Backend (Server)
```bash
cd server
npm install
npm run dev
```

### Frontend (Walk-in Form)
```bash
cd walk-in-form
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
SPREADSHEET_ID=your_google_sheets_id
GOOGLE_SERVICE_ACCOUNT=your_service_account_json
PORT=3001
```

### Frontend (.env)
```
REACT_APP_API_BASE=http://localhost:3001
REACT_APP_SHOW_CREATE_BUTTON=true
REACT_APP_SHOW_FORM_ACTIONS=true
```

## Features

- 5-step customer walk-in form with validation
- Real-time search and filtering
- Responsive design (mobile/tablet/desktop)
- Google Sheets data persistence
- AI-powered customer insights
- Redux state management

## Docker Deployment Details

The application is fully containerized with Docker:

- Both frontend and backend run in separate Docker containers
- Docker Compose orchestrates the entire application stack
- Easy development and production deployment
- Run ขึ้น docker state จะอยู่ที่ droplet
