-- 1. Create a database
CREATE DATABASE IF NOT EXISTS charityevents_db;
USE charityevents_db;

-- 2. Create a charitable organizations table
CREATE TABLE organisations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    mission TEXT,
    contact_email VARCHAR(100)
);

-- 3. Create an activity classification table
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Create an activity table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    full_description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    city VARCHAR(100),
    ticket_price DECIMAL(10, 2) DEFAULT 0.00,
    goal_amount DECIMAL(12, 2) NOT NULL,
    current_amount DECIMAL(12, 2) DEFAULT 0.00,
    status ENUM('active', 'suspended', 'past') DEFAULT 'active',
    category_id INT,
    org_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (org_id) REFERENCES organisations(id) ON DELETE CASCADE
);



-- Insert sample organisations
INSERT INTO organisations (name, mission, contact_email) VALUES
('Hearts for Hope Foundation', 'An international charity dedicated to providing education and healthcare support to underprivileged children.', 'info@heartsforhope.org'),
('Green Earth Alliance', 'A non-profit organization focused on environmental protection and sustainable development.', 'contact@greenearth.org'),
('Community Care Network', 'A local charity offering emergency aid and long-term support to communities in need.', 'support@communitycare.org');

-- Insert event categories
INSERT INTO categories (name) VALUES
('Gala Dinner'),
('Fun Run'),
('Silent Auction'),
('Concert'),
('Workshop'),
('Sports Event');

-- Insert sample events (10 events: 8 active, 1 suspended, 1 past)
INSERT INTO events (name, description, full_description, event_date, location, city, ticket_price, goal_amount, current_amount, status, category_id, org_id) VALUES

('Hope Gala Night 2025', 'A charity gala dinner to raise funds for underprivileged children.', 'Join our annual Hope Gala Night, featuring a gourmet three-course dinner, live jazz music, and a silent auction. All proceeds will support educational programs and medical care for children in need. The event will be held at one of Sydney’s most prestigious venues, with inspiring guest speakers sharing real-life impact stories.', '2025-11-15', 'Grand Hyatt Sydney', 'Sydney', 250.00, 100000.00, 45000.00, 'active', 1, 1),

('Run for Green Future', 'A 5km charity fun run supporting environmental conservation.', 'Participate in our eco-friendly 5km run through beautiful parklands! Open to all ages, this event promotes sustainability while raising funds for reforestation and ocean cleanup projects. Each participant receives an organic cotton T-shirt and a finisher certificate. Registration fees directly support Green Earth Alliance initiatives.', '2025-10-22', 'Royal Botanic Gardens', 'Melbourne', 35.00, 50000.00, 28000.00, 'active', 2, 2),

('Art for Hearts Auction', 'A silent auction of local artwork to support children with heart conditions.', 'Explore over 50 unique artworks—including paintings, sculptures, and photographs—created by local artists. All proceeds fund life-saving surgeries and medical care for children with congenital heart disease. Complimentary wine and canapés will be served. Bidding is open to all art and charity enthusiasts.', '2025-11-08', 'Queensland Art Gallery', 'Brisbane', 0.00, 75000.00, 12000.00, 'active', 3, 1),

('Music for Tomorrow Concert', 'A charity concert featuring young musicians to support music education.', 'Enjoy an evening of classical and contemporary performances by talented young musicians. Held at Perth Concert Hall, this event raises funds to provide musical instruments and lessons to underfunded schools. Ticket sales directly enable access to arts education for disadvantaged students.', '2025-12-03', 'Perth Concert Hall', 'Perth', 80.00, 40000.00, 18500.00, 'active', 4, 3),

('Community Care Soccer Cup', 'A charity football match supporting local emergency aid programs.', 'Watch local teams compete in a friendly football match! All ticket and sponsorship revenue supports Community Care Network’s emergency relief efforts. Post-match BBQ and awards ceremony included. Children under 12 enter free. A fun, family-friendly event for a great cause.', '2025-10-28', 'Adelaide Oval', 'Adelaide', 25.00, 30000.00, 15600.00, 'active', 6, 3),

('Sustainable Living Workshop', 'A hands-on workshop on zero-waste and eco-friendly living.', 'Learn practical skills for sustainable living, including composting, plastic-free shopping, and DIY eco-products. Led by environmental experts, this interactive session includes a take-home sustainability kit. Proceeds fund community environmental education programs.', '2025-11-20', 'National Library of Australia', 'Canberra', 45.00, 15000.00, 8200.00, 'active', 5, 2),

('Winter Warmth Gala', 'A winter charity gala supporting homeless shelters.', 'A cozy evening of fine dining and jazz to raise funds for winter supplies and shelter for the homeless. Semi-formal attire requested. Includes a three-course meal, live entertainment, and charity auction. All proceeds go to emergency winter aid programs.', '2025-12-10', 'Doltone House', 'Sydney', 200.00, 80000.00, 32000.00, 'active', 1, 3),

('Charity Cycling Challenge', 'A 50km coastal cycling event for cancer research.', 'Cycle along the stunning Gold Coast coastline in this 50km challenge. Designed for experienced riders, the route includes support stations and medical aid. Participants receive a commemorative jersey. Funds raised support cancer research and patient care.', '2025-11-25', 'Broadwater Parklands', 'Gold Coast', 50.00, 60000.00, 24500.00, 'active', 6, 2),

('Children''s Book Fair', 'A charity book sale to build libraries in remote schools.', 'Thousands of gently used children’s books available at low prices! All proceeds fund library construction in rural and remote schools. Activities include storytime sessions, drawing workshops, and author meet-and-greets. A perfect weekend outing for families.', '2024-10-18', 'Melbourne Convention Centre', 'Melbourne', 0.00, 25000.00, 25000.00, 'past', 5, 1),

('Heritage Charity Auction', 'An auction of cultural artifacts to preserve heritage sites.', 'Bid on rare historical reproductions, antique furniture, and heritage photographs. Professional auctioneers and valuers on site. This event was suspended due to a policy compliance review.', '2025-09-30', 'State Library of NSW', 'Sydney', 0.00, 50000.00, 18900.00, 'suspended', 3, 1);

-- Add indexes
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_city ON events(city);
CREATE INDEX idx_events_category ON events(category_id);