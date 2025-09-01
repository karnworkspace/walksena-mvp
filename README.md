# WalkSena MVP - Walk-In Form System

Production-ready MVP of the SENA walk-in customer form system.

## System Overview

A full-stack application for managing walk-in customer data collection:

- **Frontend**: React 19 + TypeScript with Ant Design UI components
- **Backend**: Node.js + Express API server
- **Database**: Google Sheets integration for data storage
- **Deployment**: Backend on Render, Frontend on Vercel

## Live Deployment

- **Backend API**: https://walksena-v2.onrender.com
- **Frontend**: [To be deployed on Vercel]

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
REACT_APP_API_BASE=https://walksena-v2.onrender.com
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

## Deployment

- Backend deploys automatically to Render from this repository
- Frontend configured for Vercel deployment with static build
