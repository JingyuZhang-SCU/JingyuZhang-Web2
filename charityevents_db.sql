-- 1. Create a database
CREATE DATABASE charityevents_db;
USE charityevents_db;

-- 2. Create a list of charitable organizations
CREATE TABLE organisations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    mission TEXT,
    contact_email VARCHAR(100)
);

-- 3. Create an activity classification table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

-- 4. Create an activity table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(150),
    ticket_price DECIMAL(10,2),
    goal_amount DECIMAL(12,2),
    current_amount DECIMAL(12,2) DEFAULT 0,
    category_id INT,
    org_id INT,
    status ENUM('active', 'suspended', 'past') DEFAULT 'active',
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (org_id) REFERENCES organisations(id)
);
