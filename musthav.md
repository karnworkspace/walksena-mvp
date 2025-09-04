# WalkSena MVP - Must Have Requirements & Setup Guide

## System Overview
WalkSena MVP is a full-stack walk-in customer form system that uses React frontend, Node.js backend, and Google Sheets as database.

## Essential Requirements

### 1. Google Sheets Setup
**Critical:** The entire system depends on proper Google Sheets configuration.

#### Google Sheets Requirements:
- **Sheet Name**: Must be named exactly `Walk-In` (case-sensitive)
- **Column Structure**: System maps data to columns A through CF (84 columns total)
- **Key Columns**:
  - Column A & F: Running number (auto-generated)
  - Column H onwards: Form data mapping
  - Column Q (16): Full Name
  - Column R (17): Phone Number  
  - Column S (18): Email

#### Google Cloud Setup:
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Generate Service Account Key (JSON)
5. **Share your Google Sheet with the service account email** (Editor permissions)

### 2. Environment Variables

#### Backend (.env)
```bash
# Required - Google Sheets ID from URL
SPREADSHEET_ID=1ABC123DEF456GHI789JKL

# Required - Service account credentials (JSON as string)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Optional
PORT=3001
NODE_ENV=production
```

#### Frontend (.env.production)
```bash
# Required - Backend API URL
REACT_APP_API_BASE=https://your-backend-url.onrender.com

# Optional - Feature flags
REACT_APP_SHOW_CREATE_BUTTON=true
REACT_APP_SHOW_FORM_ACTIONS=true
```

### 3. Required Dependencies

#### Backend (Node.js)
- `googleapis` - Google Sheets API client
- `express` - Web server framework
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `typescript` - TypeScript support

#### Frontend (React)
- `antd` - UI component library
- `react-hook-form` - Form handling
- `@reduxjs/toolkit` - State management
- `axios` - HTTP client
- `dayjs` - Date handling
- `yup` - Validation schemas

### 4. Deployment Configuration

#### Backend (Render)
File: `render.yaml`
```yaml
services:
  - type: web
    name: walksena-api
    env: node
    plan: free
    buildCommand: cd server && npm install && npm run build
    startCommand: cd server && npm start
    envVars:
      - key: SPREADSHEET_ID
        sync: false
      - key: GOOGLE_SERVICE_ACCOUNT_KEY
        sync: false
```

#### Frontend (Vercel)
- Build Command: `cd walk-in-form && npm install && npm run build`
- Output Directory: `walk-in-form/build`
- Environment variables set in Vercel dashboard

### 5. Data Structure

#### Customer Form Data Mapping:
- Column H: Sales Queue
- Column I: Visit Date  
- Column J: Lead From Month
- Column K: Media Online
- Column L: Media Offline
- Column M: Walk-in Type
- Column N: Pass Site Source
- Column O: Latest Status
- Column P: Grade
- Column Q: Full Name
- Column R: Phone Number
- Column S: Email
- Column T: Line ID
- Column U: Age
- Columns V-CF: Additional customer data

### 6. Critical Setup Steps

#### Step 1: Google Sheets Preparation
1. Create a new Google Sheets document
2. Rename the first sheet to exactly `Walk-In`
3. Set up column headers (optional, system will append data)
4. Note the Spreadsheet ID from URL

#### Step 2: Google Cloud Configuration
1. Go to Google Cloud Console
2. Create new project or select existing
3. Enable Google Sheets API and Google Drive API
4. Create Service Account with Editor role
5. Generate and download JSON key
6. Copy service account email address

#### Step 3: Sheet Permissions
1. Open your Google Sheet
2. Click "Share" button
3. Add service account email with Editor permissions
4. **Critical:** Must grant Editor access for write operations

#### Step 4: Environment Setup
1. Set `SPREADSHEET_ID` to your sheet ID
2. Set `GOOGLE_SERVICE_ACCOUNT_KEY` to full JSON content
3. Ensure proper escaping of JSON in environment variables

### 7. Troubleshooting

#### Common Issues:
1. **Authentication Failed**: Check service account key format and sheet permissions
2. **Sheet Not Found**: Verify sheet name is exactly `Walk-In`
3. **Write Permission Denied**: Ensure service account has Editor access
4. **Invalid Spreadsheet ID**: Copy ID from sheet URL, not sheet name

#### Testing Connection:
- Backend provides `/api/health` endpoint for system status
- Logs show Google Sheets connection status on startup
- Test API endpoint: `GET /api/test-connection`

### 8. System Architecture

```
Frontend (Vercel) → Backend API (Render) → Google Sheets API → Google Drive
```

#### API Endpoints:
- `POST /api/walk-in` - Create new entry
- `GET /api/walk-in` - Fetch all entries
- `PUT /api/walk-in/:id` - Update entry
- `GET /api/health` - System health check

### 9. Scaling Considerations

#### For Production Use:
1. Consider upgrading from free hosting tiers
2. Implement proper error logging
3. Add database backup strategies
4. Consider moving from Google Sheets to proper database
5. Implement user authentication if needed

#### Performance Notes:
- Google Sheets API has rate limits (100 requests/100 seconds/user)
- Consider caching for read-heavy operations
- Batch operations for bulk data updates

### 10. Replication Guide

#### To replicate this system:
1. Clone repository structure
2. Set up Google Cloud project and service account
3. Create Google Sheet with `Walk-In` tab name
4. Configure environment variables
5. Deploy backend to Render using `render.yaml`
6. Deploy frontend to Vercel with proper build settings
7. Test end-to-end functionality

#### Minimum Viable Setup:
- Google Cloud Service Account with Sheets API
- Google Sheet named `Walk-In` with Editor sharing
- Environment variables: `SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`
- Both frontend and backend properly deployed and connected

This system can be adapted for similar form-based data collection applications by modifying the column mapping in `GoogleSheetsService.ts` and updating the form structure accordingly.