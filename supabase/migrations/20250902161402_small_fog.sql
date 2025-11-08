-- Create database
CREATE DATABASE IF NOT EXISTS sunrise_marketing;
USE sunrise_marketing;

-- Admin table for login credentials
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Insert default admin user (password: admin123)
INSERT INTO admin (username, password, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@sunrisemarketing.com')
ON DUPLICATE KEY UPDATE username = username;

-- Enquiry form submissions table
CREATE TABLE IF NOT EXISTS enquiry_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Get in touch form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO enquiry_submissions (name, email, phone, subject, message) VALUES 
('John Doe', 'john@example.com', '+91 9876543210', 'Property Inquiry', 'I am interested in your residential projects.'),
('Jane Smith', 'jane@example.com', '+91 9876543211', 'Investment Opportunity', 'Looking for commercial investment options.'),
('Mike Johnson', 'mike@example.com', '+91 9876543212', 'General Inquiry', 'Need more information about your services.');

INSERT INTO contact_submissions (name, email, phone, message) VALUES 
('Sarah Wilson', 'sarah@example.com', '+91 9876543213', 'Hello, I would like to schedule a meeting to discuss potential collaboration.'),
('David Brown', 'david@example.com', '+91 9876543214', 'Interested in your current projects. Please contact me.'),
('Lisa Davis', 'lisa@example.com', '+91 9876543215', 'Need assistance with property documentation.');