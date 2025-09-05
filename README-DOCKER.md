# 🐳 Walksena MVP - Docker Development Setup

## 📋 Prerequisites

1. **Docker Desktop** ติดตั้งและรันอยู่
2. **Git** สำหรับ clone โปรเจค
3. **Environment Files** ตั้งค่าเรียบร้อย

## ⚙️ Environment Setup

### สร้าง Environment Files จาก Templates:

```bash
# Backend environment
cp server/.env.example server/.env
# แก้ไข server/.env ใส่ Google Sheets credentials ที่ถูกต้อง

# Frontend environment
cp walk-in-form/.env.example walk-in-form/.env
# แก้ไข walk-in-form/.env หากต้องการเปลี่ยน API URL หรือ feature flags
```

### ⚠️ สำคัญ:
- **ห้าม commit ไฟล์ `.env`** เข้า git (มี credentials ละเอียดอ่อน)
- **ใช้ `.env.example`** เป็น template เท่านั้น
- **Google Sheets credentials** หาได้จาก Google Cloud Console

## 🚀 Quick Start

### 1. Build และ Run ทั้งระบบ

```bash
# ใน directory หลัก walksena-mvp/
docker-compose up --build
```

### 2. เข้าใช้งาน

- **Frontend (React)**: http://localhost:3000
- **Backend (API)**: http://localhost:3001

### 3. หยุดระบบ

```bash
docker-compose down
```

## 🔧 Development Commands

### Build Images ใหม่
```bash
docker-compose build
```

### รันแบบ Background
```bash
docker-compose up -d
```

### ดู Logs
```bash
# ดู logs ทั้งหมด
docker-compose logs

# ดู logs ของ service เดียว
docker-compose logs backend
docker-compose logs frontend

# ติดตาม logs แบบ real-time
docker-compose logs -f
```

### เข้าไปใน Container
```bash
# เข้า Backend container
docker-compose exec backend sh

# เข้า Frontend container  
docker-compose exec frontend sh
```

## 📁 File Structure

```
walksena-mvp/
├── docker-compose.yml           # Main orchestration file
├── server/
│   ├── Dockerfile              # Backend container setup
│   ├── .dockerignore           # Files to exclude from build
│   └── .env                    # Backend environment variables
└── walk-in-form/
    ├── Dockerfile              # Frontend container setup
    ├── .dockerignore           # Files to exclude from build  
    └── .env                    # Frontend environment variables
```

## 🔄 Hot Reload

ทั้ง Frontend และ Backend รองรับ **Hot Reload** ในโหมด Development:

- **Frontend**: ไฟล์ในโฟลเดอร์ `src/` เปลี่ยนแล้วจะ reload อัตโนมัติ
- **Backend**: ไฟล์ในโฟลเดอร์ `src/` เปลี่ยนแล้ว nodemon จะ restart อัตโนมัติ

## 🐛 Troubleshooting

### ปัญหา Port ชน
```bash
# หยุดทุก containers
docker-compose down

# เช็คว่ามี process ใช้ port 3000, 3001 อยู่ไหม
lsof -i :3000
lsof -i :3001
```

### ปัญหา Hot Reload ไม่ทำงาน
```bash
# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### ลบ Images และ Volumes
```bash
# ลบ containers และ images
docker-compose down --rmi all

# ลบ volumes
docker-compose down -v
```

## 📝 Environment Variables

### Backend (.env)
- Google Sheets API credentials
- Port settings
- Database connections

### Frontend (.env)
```
REACT_APP_API_BASE=http://localhost:3001
REACT_APP_SHOW_CREATE_BUTTON=false
REACT_APP_SHOW_FORM_ACTIONS=true
```

## 🔒 Security Notes

- **ไม่ใช้ในการ deploy production** - setup นี้เป็น development mode
- **Google Sheets credentials** อยู่ใน .env file ไม่ควร commit เข้า git
- **Volume mounts** ทำให้ source code ปลอดภัยอยู่ใน host machine

## ✅ Next Steps

หลังจากระบบทำงานแล้ว คุณสามารถ:

1. แก้ไข code ใน `server/src/` หรือ `walk-in-form/src/`
2. ดูผลลัพธ์แบบ real-time
3. Debug ผ่าน browser dev tools หรือ container logs
4. Test API endpoints ผ่าน http://localhost:3001

## 🆘 Help

หากมีปัญหา:
1. เช็ค logs: `docker-compose logs`
2. Restart: `docker-compose restart`
3. Rebuild: `docker-compose up --build`