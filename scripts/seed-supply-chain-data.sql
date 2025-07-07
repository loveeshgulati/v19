-- Seed data for Supply Chain Management System

-- Insert sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@scm.com', '$2b$10$hash1', 'System', 'Administrator', 'admin'),
('procurement_mgr', 'procurement@scm.com', '$2b$10$hash2', 'Sarah', 'Johnson', 'procurement'),
('warehouse_mgr', 'warehouse@scm.com', '$2b$10$hash3', 'Mike', 'Wilson', 'warehouse'),
('logistics_coord', 'logistics@scm.com', '$2b$10$hash4', 'Emily', 'Davis', 'logistics'),
('supply_manager', 'supply@scm.com', '$2b$10$hash5', 'John', 'Smith', 'manager');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic components and devices'),
('Raw Materials', 'Basic materials for manufacturing'),
('Packaging', 'Packaging materials and supplies'),
('Tools & Equipment', 'Tools and manufacturing equipment'),
('Chemicals', 'Chemical substances and compounds'),
('Fasteners', 'Bolts, screws, and other fastening materials');

-- Insert sample suppliers
INSERT INTO suppliers (name, contact_person, email, phone, address, city, state, country, rating, status, created_by) VALUES
('TechCorp Industries', 'Michael Chen', 'michael@techcorp.com', '+1-555-0101', '123 Tech Street', 'San Francisco', 'CA', 'USA', 4.8, 'active', 2),
('Global Components', 'Sarah Rodriguez', 'sarah@globalcomp.com', '+1-555-0102', '456 Industrial Blvd', 'Chicago', 'IL', 'USA', 4.5, 'active', 2),
('Reliable Materials', 'David Thompson', 'david@reliablematerials.com', '+1-555-0103', '789 Materials Ave', 'Houston', 'TX', 'USA', 4.3, 'active', 2),
('Quick Supply Co', 'Lisa Wang', 'lisa@quicksupply.com', '+1-555-0104', '321 Supply Chain Dr', 'Phoenix', 'AZ', 'USA', 3.9, 'under_review', 2),
('Industrial Parts Co', 'Robert Johnson', 'robert@industrialparts.com', '+1-555-0105', '654 Industrial Way', 'Detroit', 'MI', 'USA', 4.2, 'active', 2),
('Metal Works Ltd', 'Jennifer Brown', 'jennifer@metalworks.com', '+1-555-0106', '987 Metal Street', 'Pittsburgh', 'PA', 'USA', 4.0, 'active', 2);

-- Insert sample warehouses
INSERT INTO warehouses (name, code, address, city, state, country, manager_id, capacity, current_utilization) VALUES
('Main Warehouse', 'WH-001', '100 Warehouse Blvd', 'Los Angeles', 'CA', 'USA', 3, 100000.00, 65.50),
('East Coast Facility', 'WH-002', '200 Storage Ave', 'New York', 'NY', 'USA', 3, 80000.00, 72.30),
('Midwest Distribution', 'WH-003', '300 Distribution Dr', 'Chicago', 'IL', 'USA', 3, 60000.00, 58.20),
('South Regional', 'WH-004', '400 Regional Rd', 'Atlanta', 'GA', 'USA', 3, 50000.00, 43.80);

-- Insert sample inventory items
INSERT INTO inventory_items (name, description, sku, category_id, unit_price, unit_of_measure, minimum_stock_level, maximum_stock_level, reorder_point, reorder_quantity, created_by) VALUES
('Industrial Bolts M8x40', 'High-strength steel bolts', 'BOLT-M8-040', 6, 0.25, 'piece', 500, 5000, 1000, 2000, 2),
('Electronic Circuit Boards', 'Main control circuit boards', 'PCB-MAIN-001', 1, 45.00, 'piece', 100, 500, 150, 200, 2),
('Packaging Foam Sheets', 'Protective foam packaging', 'FOAM-PKG-001', 3, 2.50, 'sheet', 200, 2000, 300, 500, 2),
('Hydraulic Valves', 'Industrial hydraulic control valves', 'HYD-VLV-025', 4, 125.00, 'piece', 25, 100, 40, 50, 2),
('Steel Reinforcement Bars', 'Steel rebar for construction', 'STL-RBR-001', 2, 8.75, 'meter', 50, 300, 75, 100, 2),
('Chemical Cleaning Agent', 'Industrial cleaning solution', 'CHEM-CLN-001', 5, 15.50, 'liter', 30, 200, 50, 75, 2),
('Precision Screws M6x25', 'Precision machined screws', 'SCR-M6-025', 6, 0.15, 'piece', 1000, 10000, 2000, 3000, 2),
('LED Display Panels', 'High-resolution LED panels', 'LED-PNL-001', 1, 235.00, 'piece', 20, 100, 30, 40, 2);

-- Insert sample inventory stock
INSERT INTO inventory_stock (item_id, warehouse_id, quantity_on_hand, quantity_allocated, location) VALUES
(1, 1, 2500, 100, 'A-1-B'),
(2, 1, 85, 15, 'B-2-A'),
(3, 1, 1200, 50, 'C-1-C'),
(4, 1, 15, 5, 'A-3-B'),
(5, 1, 0, 0, 'D-1-A'),
(6, 1, 45, 10, 'E-2-B'),
(7, 1, 5500, 200, 'A-2-C'),
(8, 1, 28, 8, 'B-1-A'),
(1, 2, 1800, 80, 'Section-A'),
(2, 2, 65, 10, 'Section-B'),
(3, 2, 800, 30, 'Section-C'),
(4, 2, 22, 2, 'Section-D');

-- Insert sample purchase orders
INSERT INTO purchase_orders (po_number, supplier_id, status, order_date, required_date, expected_delivery_date, total_amount, created_by) VALUES
('PO-2024-001', 1, 'completed', '2024-01-15 10:00:00', '2024-01-22', '2024-01-21', 25000.00, 2),
('PO-2024-002', 2, 'in_transit', '2024-01-18 14:30:00', '2024-01-25', '2024-01-25', 18500.00, 2),
('PO-2024-003', 3, 'sent', '2024-01-20 09:15:00', '2024-01-28', '2024-01-28', 12000.00, 2),
('PO-2024-004', 4, 'pending_approval', '2024-01-22 11:45:00', '2024-01-30', '2024-01-30', 8750.00, 2),
('PO-2024-005', 5, 'draft', '2024-01-23 16:20:00', '2024-02-05', '2024-02-05', 35000.00, 2);

-- Insert sample purchase order items
INSERT INTO purchase_order_items (po_id, item_id, quantity_ordered, quantity_received, unit_price, expected_delivery_date) VALUES
(1, 1, 2000, 2000, 0.23, '2024-01-21'),
(1, 2, 50, 50, 42.00, '2024-01-21'),
(2, 3, 500, 0, 2.30, '2024-01-25'),
(2, 4, 25, 0, 120.00, '2024-01-25'),
(3, 5, 100, 0, 8.50, '2024-01-28'),
(3, 6, 50, 0, 15.00, '2024-01-28'),
(4, 7, 1000, 0, 0.14, '2024-01-30'),
(5, 8, 20, 0, 225.00, '2024-02-05');

-- Insert sample shipments
INSERT INTO shipments (shipment_number, po_id, supplier_id, warehouse_id, status, tracking_number, carrier, ship_date, estimated_delivery_date, shipping_cost) VALUES
('SH-001', 1, 1, 1, 'delivered', 'TC123456789', 'FedEx', '2024-01-19', '2024-01-21', 250.00),
('SH-002', 2, 2, 1, 'in_transit', 'GC987654321', 'UPS', '2024-01-23', '2024-01-25', 180.00),
('SH-003', 3, 3, 1, 'preparing', 'RM456789123', 'DHL', NULL, '2024-01-28', 150.00),
('SH-004', NULL, 4, 1, 'delayed', 'QS789123456', 'FedEx', '2024-01-24', '2024-01-30', 200.00);

-- Insert sample inventory transactions
INSERT INTO inventory_transactions (item_id, warehouse_id, transaction_type, quantity, unit_cost, reference_type, reference_id, transaction_date, created_by) VALUES
(1, 1, 'receipt', 2000, 0.23, 'purchase_order', 1, '2024-01-21 14:30:00', 3),
(2, 1, 'receipt', 50, 42.00, 'purchase_order', 1, '2024-01-21 14:30:00', 3),
(1, 1, 'issue', -150, 0.25, 'manual_adjustment', NULL, '2024-01-22 10:15:00', 3),
(2, 1, 'issue', -20, 45.00, 'manual_adjustment', NULL, '2024-01-22 10:15:00', 3),
(5, 1, 'adjustment', -50, 8.75, 'manual_adjustment', NULL, '2024-01-23 09:00:00', 3);

-- Insert sample stock alerts
INSERT INTO stock_alerts (item_id, warehouse_id, alert_type, alert_level, message, is_resolved) VALUES
(2, 1, 'low_stock', 'warning', 'Electronic Circuit Boards below minimum stock level (100 units)', FALSE),
(4, 1, 'low_stock', 'warning', 'Hydraulic Valves below minimum stock level (25 units)', FALSE),
(5, 1, 'out_of_stock', 'critical', 'Steel Reinforcement Bars completely out of stock', FALSE),
(6, 1, 'low_stock', 'warning', 'Chemical Cleaning Agent below minimum stock level (30 units)', FALSE);

-- Insert sample supplier performance data
INSERT INTO supplier_performance (supplier_id, evaluation_period, on_time_delivery_rate, quality_rating, cost_competitiveness, overall_rating, total_orders, total_value, evaluation_date, created_by) VALUES
(1, '2024-Q1', 94.50, 4.8, 4.2, 4.5, 45, 1250000.00, '2024-01-31', 2),
(2, '2024-Q1', 89.20, 4.5, 4.0, 4.2, 32, 890000.00, '2024-01-31', 2),
(3, '2024-Q1', 87.10, 4.3, 4.1, 4.1, 28, 675000.00, '2024-01-31', 2),
(4, '2024-Q1', 76.30, 3.9, 4.5, 3.8, 18, 320000.00, '2024-01-31', 2),
(5, '2024-Q1', 91.80, 4.2, 3.8, 4.0, 12, 450000.00, '2024-01-31', 2);
