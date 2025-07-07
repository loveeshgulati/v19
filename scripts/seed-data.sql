-- Seed data for CRM System

-- Insert sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@crm.com', '$2b$10$hash1', 'Admin', 'User', 'admin'),
('john.smith', 'john.smith@crm.com', '$2b$10$hash2', 'John', 'Smith', 'manager'),
('sarah.johnson', 'sarah.johnson@crm.com', '$2b$10$hash3', 'Sarah', 'Johnson', 'sales_rep'),
('mike.wilson', 'mike.wilson@crm.com', '$2b$10$hash4', 'Mike', 'Wilson', 'sales_rep'),
('emily.davis', 'emily.davis@crm.com', '$2b$10$hash5', 'Emily', 'Davis', 'marketing');

-- Insert sample companies
INSERT INTO companies (name, industry, size, website, phone, address, city, state, country, created_by) VALUES
('Acme Corporation', 'Technology', 'large', 'https://acme.com', '+1-555-0101', '123 Tech Street', 'San Francisco', 'CA', 'USA', 2),
('TechStart Inc', 'Software', 'startup', 'https://techstart.com', '+1-555-0102', '456 Innovation Ave', 'Austin', 'TX', 'USA', 3),
('Global Solutions', 'Consulting', 'enterprise', 'https://globalsolutions.com', '+1-555-0103', '789 Business Blvd', 'New York', 'NY', 'USA', 2),
('Enterprise Co', 'Manufacturing', 'large', 'https://enterprise.com', '+1-555-0104', '321 Industrial Way', 'Chicago', 'IL', 'USA', 4),
('Digital Agency', 'Marketing', 'medium', 'https://digitalagency.com', '+1-555-0  'IL', 'USA', 4),
('Digital Agency', 'Marketing', 'medium', 'https://digitalagency.com', '+1-555-0105', '654 Creative Lane', 'Los Angeles', 'CA', 'USA', 5),
('StartUp Hub', 'Technology', 'small', 'https://startuphub.com', '+1-555-0106', '987 Venture Road', 'Seattle', 'WA', 'USA', 3),
('Big Client Inc', 'Finance', 'enterprise', 'https://bigclient.com', '+1-555-0107', '147 Finance Plaza', 'Boston', 'MA', 'USA', 2),
('Success Ltd', 'Retail', 'medium', 'https://success.com', '+1-555-0108', '258 Commerce St', 'Miami', 'FL', 'USA', 4);

-- Insert sample contacts
INSERT INTO contacts (company_id, first_name, last_name, email, phone, job_title, department, is_primary, created_by) VALUES
(1, 'John', 'Smith', 'john@acme.com', '+1-555-1001', 'CEO', 'Executive', TRUE, 2),
(1, 'Jane', 'Doe', 'jane@acme.com', '+1-555-1002', 'CTO', 'Technology', FALSE, 2),
(2, 'Sarah', 'Johnson', 'sarah@techstart.com', '+1-555-1003', 'Founder', 'Executive', TRUE, 3),
(3, 'Mike', 'Wilson', 'mike@globalsolutions.com', '+1-555-1004', 'VP Sales', 'Sales', TRUE, 2),
(4, 'Emily', 'Davis', 'emily@enterprise.com', '+1-555-1005', 'Procurement Manager', 'Operations', TRUE, 4),
(5, 'Alice', 'Brown', 'alice@digitalagency.com', '+1-555-1006', 'Marketing Director', 'Marketing', TRUE, 5),
(6, 'Bob', 'Green', 'bob@startuphub.com', '+1-555-1007', 'Product Manager', 'Product', TRUE, 3),
(7, 'Carol', 'White', 'carol@bigclient.com', '+1-555-1008', 'CFO', 'Finance', TRUE, 2);

-- Insert sample deals
INSERT INTO deals (title, company_id, contact_id, value, stage, probability, expected_close_date, assigned_to, created_by) VALUES
('Enterprise Software License', 1, 1, 125000.00, 'proposal', 75, '2024-02-15', 2, 2),
('Startup Package Deal', 2, 3, 25000.00, 'qualified', 50, '2024-01-30', 3, 3),
('Consulting Services Contract', 3, 4, 200000.00, 'negotiation', 80, '2024-03-01', 2, 2),
('Manufacturing Solution', 4, 5, 75000.00, 'lead', 25, '2024-04-15', 4, 4),
('Digital Marketing Campaign', 5, 6, 45000.00, 'proposal', 60, '2024-02-28', 5, 5),
('Product Development Tools', 6, 7, 35000.00, 'qualified', 40, '2024-03-15', 3, 3),
('Financial Analytics Platform', 7, 8, 150000.00, 'closed_won', 100, '2024-01-15', 2, 2);

-- Insert sample campaigns
INSERT INTO campaigns (name, type, status, start_date, end_date, budget, spent, target_audience, created_by) VALUES
('Summer Product Launch', 'email', 'active', '2024-01-01', '2024-03-31', 15000.00, 8500.00, 'Enterprise customers', 5),
('Customer Retention Drive', 'multi_channel', 'completed', '2023-10-01', '2023-12-31', 12000.00, 11800.00, 'Existing customers', 5),
('New Feature Announcement', 'email', 'draft', '2024-02-01', '2024-02-28', 8000.00, 0.00, 'All customers', 5),
('Holiday Special Offer', 'social_media', 'scheduled', '2024-03-01', '2024-03-15', 20000.00, 2500.00, 'Prospects and leads', 5);

-- Insert sample campaign metrics
INSERT INTO campaign_metrics (campaign_id, metric_date, emails_sent, emails_opened, emails_clicked, leads_generated, conversions, cost) VALUES
(1, '2024-01-15', 1500, 600, 120, 25, 5, 2000.00),
(1, '2024-02-15', 1800, 720, 144, 30, 8, 2500.00),
(2, '2023-11-15', 1200, 540, 162, 35, 12, 3000.00),
(2, '2023-12-15', 1000, 450, 135, 28, 10, 2800.00);

-- Insert sample activities
INSERT INTO activities (type, subject, description, activity_date, company_id, contact_id, deal_id, created_by) VALUES
('call', 'Initial Discovery Call', 'Discussed requirements and timeline', '2024-01-10 14:00:00', 1, 1, 1, 2),
('email', 'Proposal Follow-up', 'Sent detailed proposal document', '2024-01-12 09:30:00', 1, 1, 1, 2),
('meeting', 'Product Demo', 'Demonstrated key features and capabilities', '2024-01-15 15:00:00', 2, 3, 2, 3),
('call', 'Contract Negotiation', 'Discussed terms and pricing', '2024-01-18 11:00:00', 3, 4, 3, 2),
('note', 'Customer Feedback', 'Positive response to our proposal', '2024-01-20 16:00:00', 4, 5, 4, 4);

-- Insert sample tasks
INSERT INTO tasks (title, description, due_date, priority, company_id, contact_id, deal_id, assigned_to, created_by) VALUES
('Follow up on proposal', 'Call John Smith to discuss proposal feedback', '2024-01-25 10:00:00', 'high', 1, 1, 1, 2, 2),
('Prepare demo materials', 'Create customized demo for TechStart presentation', '2024-01-28 14:00:00', 'medium', 2, 3, 2, 3, 3),
('Send contract draft', 'Prepare and send contract for Global Solutions deal', '2024-02-01 09:00:00', 'urgent', 3, 4, 3, 2, 2),
('Schedule product training', 'Arrange training session for new customer', '2024-02-05 11:00:00', 'medium', 7, 8, 7, 2, 2);
