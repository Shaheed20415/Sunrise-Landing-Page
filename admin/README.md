# Admin Dashboard System

## Overview
Complete admin login and dashboard system for Sunrise Marketing Solutions with secure authentication and data management capabilities.

## Features

### 🔐 Admin Authentication
- Secure login with username/password
- Session management
- Password hashing with PHP's `password_hash()`
- Auto-logout functionality

### 📊 Dashboard Overview
- Statistics cards showing submission counts
- Recent submissions preview
- Clean, modern interface
- Responsive design

### 📝 Data Management
- **Enquiry Form Submissions**: Complete CRUD operations
- **Contact Form Submissions**: Full data management
- View, edit, mark, and delete records
- Status tracking (New, In Progress, Resolved)

### 🎯 Admin Actions
- **View Details**: Modal popup with full record information
- **Edit Records**: Update any field with validation
- **Mark Status**: Change record status (New/In Progress/Resolved)
- **Delete Records**: Permanent removal with confirmation
- **Direct Communication**: Email and WhatsApp links

## Database Schema

### Tables Created:
1. **admin** - Admin login credentials
2. **enquiry_submissions** - Enquiry form data
3. **contact_submissions** - Contact form data

### Default Admin Credentials:
- **Username**: `admin`
- **Password**: `admin123`

## File Structure
```
admin/
├── config/
│   ├── database.php      # Database connection
│   └── session.php       # Session management
├── database/
│   └── schema.sql        # Database schema
├── assets/
│   ├── admin-styles.css  # Custom styles
│   └── admin-scripts.js  # JavaScript functions
├── login.php             # Admin login page
├── dashboard.php         # Main dashboard
├── enquiry-data.php      # Enquiry submissions
├── contact-data.php      # Contact submissions
├── get-details.php       # Modal details view
├── edit-record.php       # Edit functionality
├── logout.php            # Logout handler
└── README.md            # Documentation
```

## Setup Instructions

1. **Database Setup**:
   - Create MySQL database named `sunrise_marketing`
   - Import the schema from `database/schema.sql`
   - Update database credentials in `config/database.php`

2. **File Permissions**:
   - Ensure PHP has read/write access to session files
   - Set appropriate file permissions for security

3. **Security Configuration**:
   - Change default admin password after first login
   - Configure secure session settings
   - Enable HTTPS in production

## Security Features

- **Password Hashing**: Uses PHP's `password_hash()` and `password_verify()`
- **Session Management**: Secure session handling with timeout
- **SQL Injection Protection**: Prepared statements throughout
- **XSS Prevention**: HTML escaping for all user input
- **CSRF Protection**: Form validation and confirmation dialogs

## Usage

1. **Login**: Access `admin/login.php` with admin credentials
2. **Dashboard**: View overview and recent submissions
3. **Manage Data**: Use enquiry-data.php and contact-data.php
4. **Actions**: View, edit, mark status, or delete records
5. **Logout**: Secure session termination

## Responsive Design
- Mobile-friendly interface
- Collapsible sidebar for smaller screens
- Responsive tables with horizontal scroll
- Touch-friendly buttons and interactions