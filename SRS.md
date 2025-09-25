# WalkSena MVP - Multi-Project System Requirements Specification (SRS)

**Version**: 2.0
**Date**: January 24, 2025
**Project**: WalkSena MVP Multi-Project Upgrade
**Status**: Draft

---

## 1. Executive Summary

### 1.1 Project Overview
WalkSena MVP จะได้รับการขยายขีดความสามารถจากระบบจัดการลูกค้า walk-in แบบโปรเจคเดียว เป็นระบบที่สามารถจัดการหลายโปรเจคได้ในสภาพแวดล้อมเดียวกัน โดยรักษาความปลอดภัยของข้อมูลและความยืดหยุ่นในการใช้งาน

### 1.2 Business Justification
- **ปัญหาปัจจุบัน**: ระบบสามารถเชื่อมต่อได้เพียง Google Sheets เดียว ทำให้ไม่สามารถรองรับการขยายธุรกิจหรือการแยกข้อมูลตามโปรเจคได้
- **โอกาส**: การขยายระบบให้รองรับหลายโปรเจคจะเปิดโอกาสการใช้งานกับลูกค้าหลายราย หรือแยกข้อมูลตามสาขา/แผนก
- **ผลตอบแทน**: เพิ่มศักยภาพการใช้งาน, ลดต้นทุนการพัฒนาระบบใหม่, เพิ่มความยืดหยุ่น

### 1.3 Success Criteria
- ระบบสามารถจัดการโปรเจคได้ไม่จำกัดจำนวน
- ผู้ใช้สามารถสลับระหว่างโปรเจคได้อย่างราบรื่น
- ข้อมูลแต่ละโปรเจคถูกแยกเก็บอย่างปลอดภัย
- ผู้ดูแลระบบสามารถเพิ่มโปรเจคใหม่ได้ด้วยตนเอง

---

## 2. Current State Analysis

### 2.1 ระบบปัจจุบัน
```
📊 Single Project Architecture
├── Frontend: React + TypeScript
├── Backend: Node.js + Express
├── Database: Google Sheets (single connection)
├── Authentication: None
└── Deployment: Docker containers
```

### 2.2 ข้อจำกัดปัจจุบัน
- **Single Project**: เชื่อมต่อได้เพียง Google Sheets เดียว
- **Hard-coded Configuration**: Spreadsheet ID และ credentials ถูก fix ใน environment
- **No User Management**: ไม่มีระบบ authentication/authorization
- **Static Schema**: Column mapping ถูกกำหนดแบบตายตัว
- **No Audit Trail**: ไม่มีการบันทึกการใช้งาน

### 2.3 จุดแข็งที่ต้องรักษา
- ✅ Docker deployment ที่เสถียร
- ✅ Google Sheets integration ที่ทำงานได้ดี
- ✅ User-friendly interface
- ✅ Responsive design

---

## 3. Stakeholders & User Roles

### 3.1 Primary Stakeholders
- **System Administrator**: ผู้ดูแลระบบ, จัดการโปรเจค, ตั้งค่าระบบ
- **Project Manager**: ผู้ดูแลโปรเจค, เข้าถึงข้อมูลโปรเจคที่รับผิดชอบ
- **Data Entry User**: ผู้ใช้งานทั่วไป, กรอกและแก้ไขข้อมูลลูกค้า

### 3.2 Secondary Stakeholders
- **Business Owner**: เจ้าของธุรกิจที่ใช้ระบบ
- **IT Support**: ทีมสนับสนุนด้านเทคนิค
- **End Customers**: ลูกค้าที่ข้อมูลถูกเก็บในระบบ

---

## 4. Functional Requirements

### 4.1 Core Features

#### 4.1.1 Multi-Project Management
**FR-001: Project Registry System**
- ระบบจะต้องสามารถเก็บข้อมูลโปรเจคหลายโปรเจคได้
- แต่ละโปรเจคจะมี: ชื่อ, คำอธิบาย, Spreadsheet ID, Sheet name, Service account credentials
- ข้อมูล credentials จะต้องถูกเข้ารหัสก่อนเก็บ

**FR-002: Project Selection Interface**
- ผู้ใช้สามารถเลือกโปรเจคที่ต้องการทำงานก่อนเข้าสู่ระบบหลัก
- แสดงสถานะการเชื่อมต่อของแต่ละโปรเจค (online/offline/error)
- บันทึก project context ใน user session

**FR-003: Dynamic Schema Management**
- ระบบจะต้องสามารถปรับ UI form และ table columns ตาม schema ของแต่ละโปรเจค
- Support การ sync schema จาก Google Sheets headers อัตโนมัติ
- Validate ข้อมูลตาม field types ที่กำหนด

#### 4.1.2 User Management & Security
**FR-004: Authentication System**
- ระบบ login/logout สำหรับผู้ใช้
- Session management และ JWT token
- Password hashing และ security best practices

**FR-005: Authorization & Access Control**
- Role-based access control (Admin, Manager, User)
- Project-level permissions (ผู้ใช้เข้าถึงได้เฉพาะโปรเจคที่ได้รับอนุญาต)
- API-level authorization checking

**FR-006: Credential Security**
- Service account keys จะต้องถูก encrypt ด้วย AES-256
- Master key management
- Credential rotation capability

#### 4.1.3 Admin Panel
**FR-007: Project CRUD Operations**
- Admin สามารถเพิ่ม, แก้ไข, ลบ, และดูโปรเจค
- ทดสอบการเชื่อมต่อ Google Sheets ก่อนบันทึก
- จัดการสิทธิ์การเข้าถึงโปรเจคของผู้ใช้

**FR-008: Schema Synchronization**
- ปุ่ม "Sync Columns" สำหรับดึง headers จาก Google Sheets
- แสดงการเปลี่ยนแปลง schema ก่อนอัปเดต
- Backup schema เก่าก่อนอัปเดต

**FR-009: User Management**
- จัดการผู้ใช้: เพิ่ม, แก้ไข, ลบ, เปลี่ยนรหัสผ่าน
- กำหนดสิทธิ์เข้าถึงโปรเจคต่อผู้ใช้
- ดูประวัติการใช้งานของผู้ใช้

#### 4.1.4 Audit & Monitoring
**FR-010: Activity Logging**
- บันทึกการ login/logout, เลือกโปรเจค, แก้ไขข้อมูล
- เก็บ IP address, User agent, Timestamp
- แยกบันทึกตามโปรเจค

**FR-011: System Monitoring**
- Dashboard แสดงสถานะการเชื่อมต่อทุกโปรเจค
- Error monitoring และ alerting
- Usage statistics per project

### 4.2 Enhanced Features

#### 4.2.1 Advanced Data Management
**FR-012: Cross-Project Analytics**
- Dashboard รวมสถิติจากทุกโปรเจค
- Export ข้อมูลแบบ cross-project
- Comparative reports

**FR-013: Data Backup & Restore**
- Automated backup ข้อมูลโปรเจค
- Point-in-time restore capability
- Configuration export/import

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
- **Response Time**: API calls < 2 seconds per request
- **Project Switching**: < 3 seconds to switch between projects
- **Concurrent Users**: Support 50+ concurrent users
- **Database**: Query response time < 500ms

### 5.2 Security Requirements
- **Data Encryption**: All credentials encrypted at rest (AES-256)
- **Transport Security**: HTTPS for all communications
- **Session Management**: Secure JWT tokens with expiration
- **Access Control**: Role-based permissions enforced at API level
- **Audit Trail**: Complete logging of all user activities

### 5.3 Reliability Requirements
- **Availability**: 99.5% uptime during business hours
- **Error Handling**: Graceful degradation when projects are unavailable
- **Data Integrity**: ACID compliance for critical operations
- **Backup**: Daily automated backups with 30-day retention

### 5.4 Scalability Requirements
- **Projects**: Support 100+ projects
- **Users**: Support 500+ registered users
- **Data Volume**: Handle 1M+ records per project
- **Geographic**: Ready for multi-region deployment

### 5.5 Usability Requirements
- **Learning Curve**: New users productive within 30 minutes
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile Support**: Responsive design for tablets/phones
- **Internationalization**: Support Thai and English languages

---

## 6. Technical Architecture

### 6.1 System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  Google Sheets  │
│   (React)       │◄──►│   (Node.js)     │◄──►│    (Multiple)   │
│                 │    │                 │    │                 │
│ - Project UI    │    │ - Auth API      │    │ - Project A     │
│ - Admin Panel   │    │ - Project API   │    │ - Project B     │
│ - User Mgmt     │    │ - Admin API     │    │ - Project ...   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         └──────────────►│   Database      │
                        │  (PostgreSQL)   │
                        │                 │
                        │ - Projects      │
                        │ - Users         │
                        │ - Activity Logs │
                        └─────────────────┘
```

### 6.2 Database Schema
```sql
-- Core Tables
projects (id, name, description, spreadsheet_id, sheet_name, encrypted_credentials, column_schema, status, created_at, updated_at)
users (id, email, name, password_hash, role, project_access, created_at, updated_at)
activity_logs (id, user_id, project_id, action, details, ip_address, user_agent, created_at)

-- Supporting Tables
user_sessions (id, user_id, token_hash, expires_at, created_at)
project_backups (id, project_id, schema_backup, created_by, created_at)
```

### 6.3 API Endpoints
```
Authentication:
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Project Management:
GET  /api/projects                    # List accessible projects
POST /api/projects/:id/select         # Select active project
GET  /api/projects/:id/health         # Test connection

Data Operations:
GET  /api/:projectId/walkin/entries   # Get project data
POST /api/:projectId/walkin/submit    # Submit new entry
PUT  /api/:projectId/walkin/:id       # Update entry

Admin Operations:
POST /api/admin/projects              # Create project
PUT  /api/admin/projects/:id          # Update project
DELETE /api/admin/projects/:id        # Delete project
POST /api/admin/projects/:id/sync     # Sync schema
GET  /api/admin/users                 # User management
GET  /api/admin/logs                  # Activity logs
```

---

## 7. Implementation Plan

### 7.1 Development Phases

#### Phase 1: Foundation (Weeks 1-2)
**Goal**: สร้างโครงสร้างพื้นฐานของระบบ Multi-Project

**Deliverables**:
- Database schema และ migrations
- Authentication system
- Basic project CRUD operations
- Project selection mechanism

**Technical Tasks**:
- [ ] Set up PostgreSQL database
- [ ] Create database schema และ migration scripts
- [ ] Implement JWT authentication
- [ ] Build project registry system
- [ ] Create encryption service สำหรับ credentials
- [ ] Update Docker configuration

#### Phase 2: Admin Interface (Weeks 2-3)
**Goal**: Admin panel สำหรับจัดการโปรเจคและผู้ใช้

**Deliverables**:
- Admin dashboard
- Project management interface
- User management system
- Schema synchronization

**Technical Tasks**:
- [ ] Build admin UI components
- [ ] Implement project CRUD operations
- [ ] Create user management interface
- [ ] Build schema sync functionality
- [ ] Add Google Sheets connection testing

#### Phase 3: Dynamic Frontend (Weeks 3-4)
**Goal**: Frontend ที่ปรับเปลี่ยนได้ตาม project schema

**Deliverables**:
- Login interface
- Project selection UI
- Dynamic form generation
- Dynamic table columns

**Technical Tasks**:
- [ ] Create login/logout UI
- [ ] Build project selector component
- [ ] Implement schema-driven form generator
- [ ] Create dynamic table component
- [ ] Update state management for multi-project

#### Phase 4: Security & Monitoring (Weeks 4-5)
**Goal**: เสริมความแข็งแกร่งด้านความปลอดภัยและการตรวจสอบ

**Deliverables**:
- Activity logging system
- Monitoring dashboard
- Security enhancements
- Testing และ documentation

**Technical Tasks**:
- [ ] Implement comprehensive audit logging
- [ ] Build monitoring dashboard
- [ ] Add security headers และ middleware
- [ ] Create backup/restore functionality
- [ ] Write unit/integration tests
- [ ] Complete documentation

### 7.2 Migration Strategy
1. **Phase 0**: Backup ข้อมูลปัจจุบัน
2. **Phase 1**: Deploy ระบบใหม่แบบ parallel
3. **Phase 2**: Migrate ข้อมูลปัจจุบันเป็น "Default Project"
4. **Phase 3**: Test ทุก functionality
5. **Phase 4**: Switch traffic to ระบบใหม่
6. **Phase 5**: Decommission ระบบเก่า

---

## 8. Risk Analysis

### 8.1 Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|---------|-------------|------------|
| Database migration complexity | High | Medium | Comprehensive testing, rollback plan |
| Google Sheets API rate limits | Medium | Medium | Connection pooling, caching |
| Security vulnerabilities | High | Low | Security audit, penetration testing |
| Performance degradation | Medium | Medium | Load testing, optimization |

### 8.2 Business Risks
| Risk | Impact | Probability | Mitigation |
|------|---------|-------------|------------|
| User adoption resistance | Medium | Medium | Training, gradual rollout |
| Data loss during migration | High | Low | Multiple backups, tested restore |
| Extended downtime | Medium | Low | Blue-green deployment |

---

## 9. Success Metrics

### 9.1 Technical Metrics
- System uptime > 99.5%
- API response time < 2 seconds
- Project switching time < 3 seconds
- Zero security incidents

### 9.2 Business Metrics
- User satisfaction score > 4.5/5
- Time to onboard new project < 1 hour
- Reduction in support tickets by 50%
- 100% feature parity with current system

### 9.3 Adoption Metrics
- 90% user login within first week
- 80% admin creating new projects within first month
- 95% feature usage rate

---

## 10. Conclusion

### 10.1 Project Benefits
- **Scalability**: รองรับการเติบโตของธุรกิจ
- **Security**: เพิ่มความปลอดภัยของข้อมูล
- **Flexibility**: ปรับเปลี่ยนได้ตามความต้องการ
- **Maintainability**: ง่ายต่อการดูแลรักษา

### 10.2 Next Steps
1. Review และ approve SRS document นี้
2. Set up development environment
3. Begin Phase 1 implementation
4. Schedule weekly progress reviews

---

## Appendices

### Appendix A: Glossary
- **Project**: หน่วยงานหรือโครงการที่มี Google Sheets แยกกัน
- **Schema**: โครงสร้างคอลัมน์และประเภทข้อมูลของแต่ละโปรเจค
- **Service Account**: บัญชีสำหรับเชื่อมต่อ Google Sheets API
- **Audit Trail**: บันทึกการใช้งานเพื่อการตรวจสอบ

### Appendix B: References
- Google Sheets API Documentation
- JWT Best Practices
- PostgreSQL Security Guidelines
- OWASP Security Guidelines

---

**Document Prepared By**: Claude Code Assistant
**Review Required By**: Project Stakeholders
**Approval Required By**: System Owner

**Last Updated**: January 24, 2025