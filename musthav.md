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

#### Frontend (.env)
```bash
# Required - Backend API URL (Docker local development)
REACT_APP_API_BASE=http://localhost:3001

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

### 4. Docker Deployment Configuration

#### Docker Compose Setup
File: `docker-compose.yml`
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - SPREADSHEET_ID=${SPREADSHEET_ID}
      - GOOGLE_SERVICE_ACCOUNT_KEY=${GOOGLE_SERVICE_ACCOUNT_KEY}

  frontend:
    build: ./walk-in-form
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE=http://localhost:3001
```

#### Deployment Commands
- Start services: `docker-compose up -d`
- Stop services: `docker-compose down`
- Rebuild: `docker-compose up --build`

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
Frontend (Docker:3000) → Backend API (Docker:3001) → Google Sheets API → Google Drive
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
4. Configure environment variables in .env files
5. Run `docker-compose up -d` to start all services
6. Access frontend at http://localhost:3000
7. Test end-to-end functionality

#### Minimum Viable Setup:
- Google Cloud Service Account with Sheets API
- Google Sheet named `Walk-In` with Editor sharing
- Environment variables: `SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`
- Both frontend and backend properly deployed and connected

This system can be adapted for similar form-based data collection applications by modifying the column mapping in `GoogleSheetsService.ts` and updating the form structure accordingly.

---

# คู่มือการติดตั้งและข้อกำหนดสำคัญ (ภาษาไทย)

## ภาพรวมระบบ
WalkSena MVP เป็นระบบฟอร์มลูกค้า walk-in แบบ full-stack ที่ใช้ React สำหรับส่วนหน้าเว็บ, Node.js สำหรับ backend, และ Google Sheets เป็นฐานข้อมูล

## ข้อกำหนดที่จำเป็นอย่างยิ่ง

### 1. การตั้งค่า Google Sheets
**สำคัญมาก:** ระบบทั้งหมดขึ้นอยู่กับการตั้งค่า Google Sheets ที่ถูกต้อง

#### ข้อกำหนดของ Google Sheets:
- **ชื่อ Sheet**: ต้องตั้งชื่อให้ตรงกันเป็น `Walk-In` (ตัวพิมพ์เล็ก-ใหญ่ต้องตรงกัน)
- **โครงสร้างคอลัมน์**: ระบบจะแมปข้อมูลลงในคอลัมน์ A ถึง CF (รวม 84 คอลัมน์)
- **คอลัมน์สำคัญ**:
  - คอลัมน์ A และ F: หมายเลขลำดับ (สร้างอัตโนมัติ)
  - คอลัมน์ H เป็นต้นไป: การแมปข้อมูลฟอร์ม
  - คอลัมน์ Q (16): ชื่อ-นามสกุล
  - คอลัมน์ R (17): หมายเลขโทรศัพท์
  - คอลัมน์ S (18): อีเมล

#### การตั้งค่า Google Cloud:
1. สร้าง Google Cloud Project
2. เปิดใช้งาน Google Sheets API
3. สร้าง Service Account
4. สร้างและดาวน์โหลด Service Account Key (ไฟล์ JSON)
5. **แชร์ Google Sheet ของคุณให้กับ service account email** (สิทธิ์แก้ไข)

### 2. ตัวแปรสภาพแวดล้อม (Environment Variables)

#### Backend (.env)
```bash
# จำเป็น - Google Sheets ID จาก URL
SPREADSHEET_ID=1ABC123DEF456GHI789JKL

# จำเป็น - ข้อมูลการยืนยันตัวตน service account (JSON เป็น string)
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# ทางเลือก
PORT=3001
NODE_ENV=production
```

#### Frontend (.env)
```bash
# จำเป็น - URL ของ Backend API (Docker local development)
REACT_APP_API_BASE=http://localhost:3001

# ทางเลือก - Feature flags
REACT_APP_SHOW_CREATE_BUTTON=true
REACT_APP_SHOW_FORM_ACTIONS=true
```

### 3. Dependencies ที่จำเป็น

#### Backend (Node.js)
- `googleapis` - Google Sheets API client
- `express` - Web server framework
- `cors` - การเรียกข้าม domain
- `dotenv` - ตัวแปรสภาพแวดล้อม
- `typescript` - TypeScript support

#### Frontend (React)
- `antd` - ไลบรารี UI components
- `react-hook-form` - จัดการฟอร์ม
- `@reduxjs/toolkit` - จัดการ state
- `axios` - HTTP client
- `dayjs` - จัดการวันที่
- `yup` - Validation schemas

### 4. การตั้งค่า Deployment

#### Docker Deployment
ไฟล์: `docker-compose.yml`
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - SPREADSHEET_ID=${SPREADSHEET_ID}
      - GOOGLE_SERVICE_ACCOUNT_KEY=${GOOGLE_SERVICE_ACCOUNT_KEY}

  frontend:
    build: ./walk-in-form
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE=http://localhost:3001
```

#### คำสั่ง Deployment
- เริ่มบริการ: `docker-compose up -d`
- หยุดบริการ: `docker-compose down`
- สร้างใหม่: `docker-compose up --build`

### 5. โครงสร้างข้อมูล

#### การแมปข้อมูลฟอร์มลูกค้า:
- คอลัมน์ H: คิวขาย (Sales Queue)
- คอลัมน์ I: วันที่เข้าชม
- คอลัมน์ J: Lead จากเดือน
- คอลัมน์ K: สื่อออนไลน์
- คอลัมน์ L: สื่อออฟไลน์
- คอลัมน์ M: ประเภท Walk-in
- คอลัมน์ N: แหล่งที่ผ่านมา
- คอลัมน์ O: สถานะล่าสุด
- คอลัมน์ P: เกรด
- คอลัมน์ Q: ชื่อ-นามสกุล
- คอลัมน์ R: หมายเลขโทรศัพท์
- คอลัมน์ S: อีเมล
- คอลัมน์ T: Line ID
- คอลัมน์ U: อายุ
- คอลัมน์ V-CF: ข้อมูลลูกค้าเพิ่มเติม

### 6. ขั้นตอนการติดตั้งที่สำคัญ

#### ขั้นตอนที่ 1: เตรียม Google Sheets
1. สร้างเอกสาร Google Sheets ใหม่
2. เปลี่ยนชื่อ sheet แรกเป็น `Walk-In` (ตรงตามตัวอักษรเป๊ะๆ)
3. ตั้งหัวข้อคอลัมน์ (ทางเลือก ระบบจะเพิ่มข้อมูลได้)
4. จดเลข Spreadsheet ID จาก URL

#### ขั้นตอนที่ 2: ตั้งค่า Google Cloud
1. เข้าไปที่ Google Cloud Console
2. สร้างโปรเจคใหม่หรือเลือกที่มีอยู่
3. เปิดใช้งาน Google Sheets API และ Google Drive API
4. สร้าง Service Account ด้วยบทบาท Editor
5. สร้างและดาวน์โหลดคีย์ JSON
6. คัดลอกอีเมลของ service account

#### ขั้นตอนที่ 3: การตั้งสิทธิ์ Sheet
1. เปิด Google Sheet ของคุณ
2. คลิกปุ่ม "แชร์"
3. เพิ่มอีเมลของ service account พร้อมสิทธิ์แก้ไข
4. **สำคัญ:** ต้องให้สิทธิ์แก้ไขเพื่อการเขียนข้อมูล

#### ขั้นตอนที่ 4: ตั้งค่าสภาพแวดล้อม
1. ตั้งค่า `SPREADSHEET_ID` เป็น ID ของ sheet
2. ตั้งค่า `GOOGLE_SERVICE_ACCOUNT_KEY` เป็นเนื้อหา JSON ทั้งหมด
3. ตรวจสอบการ escape JSON ในตัวแปรสภาพแวดล้อม

### 7. การแก้ปัญหา

#### ปัญหาที่พบบ่อย:
1. **การยืนยันตัวตนล้มเหลว**: ตรวจสอบรูปแบบคีย์ service account และสิทธิ์ sheet
2. **หา Sheet ไม่พบ**: ตรวจสอบชื่อ sheet ว่าเป็น `Walk-In` เป๊ะๆ
3. **ไม่มีสิทธิ์เขียน**: ตรวจสอบให้ service account มีสิทธิ์แก้ไข
4. **Spreadsheet ID ไม่ถูกต้อง**: คัดลอก ID จาก URL ของ sheet ไม่ใช่ชื่อ sheet

#### การทดสอบการเชื่อมต่อ:
- Backend มี endpoint `/api/health` สำหรับตรวจสอบสถานะระบบ
- Log จะแสดงสถานะการเชื่อมต่อ Google Sheets เมื่อเริ่มต้น
- ทดสอบ API endpoint: `GET /api/test-connection`

### 8. สถาปัตยกรรมระบบ

```
Frontend (Docker:3000) → Backend API (Docker:3001) → Google Sheets API → Google Drive
```

#### API Endpoints:
- `POST /api/walk-in` - สร้างรายการใหม่
- `GET /api/walk-in` - ดึงข้อมูลทั้งหมด
- `PUT /api/walk-in/:id` - อัพเดทรายการ
- `GET /api/health` - ตรวจสอบสุขภาพระบบ

### 9. ข้อพิจารณาสำหรับการขยายระบบ

#### สำหรับการใช้งานจริง:
1. พิจารณาอัพเกรดจาก hosting แบบฟรี
2. ติดตั้งระบบ error logging ที่เหมาะสม
3. เพิ่มกลยุทธ์สำรองข้อมูล
4. พิจารณาย้ายจาก Google Sheets ไปฐานข้อมูลจริง
5. ติดตั้งระบบ authentication หากจำเป็น

#### หมายเหตุเรื่องประสิทธิภาพ:
- Google Sheets API มีข้อจำกัดอัตรา (100 requests/100 seconds/user)
- พิจารณาใช้ cache สำหรับการอ่านข้อมูลบ่อย
- ใช้ batch operations สำหรับการอัพเดทข้อมูลจำนวนมาก

### 10. คู่มือการทำซ้ำระบบ

#### วิธีการทำซ้ำระบบนี้:
1. Clone โครงสร้าง repository
2. ตั้งค่า Google Cloud project และ service account
3. สร้าง Google Sheet พร้อมแท็บชื่อ `Walk-In`
4. ตั้งค่าตัวแปรสภาพแวดล้อมในไฟล์ .env
5. รันคำสั่ง `docker-compose up -d` เพื่อเริ่มบริการทั้งหมด
6. เข้าถึง frontend ที่ http://localhost:3000
7. ทดสอบการทำงานแบบ end-to-end

#### การติดตั้งขั้นต่ำ:
- Google Cloud Service Account พร้อม Sheets API
- Google Sheet ชื่อ `Walk-In` พร้อมการแชร์สิทธิ์แก้ไข
- ตัวแปรสภาพแวดล้อม: `SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`
- ทั้ง frontend และ backend deploy และเชื่อมต่อกันถูกต้อง

ระบบนี้สามารถดัดแปลงสำหรับแอปพลิเคชันเก็บข้อมูลฟอร์มแบบอื่นๆ ได้โดยการแก้ไขการแมปคอลัมน์ใน `GoogleSheetsService.ts` และอัพเดทโครงสร้างฟอร์มตามความเหมาะสม