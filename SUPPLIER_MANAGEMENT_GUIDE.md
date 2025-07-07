# Supplier Management Guide

## Overview
The SplyBob now includes comprehensive supplier management features that allow managers to control supplier access and monitor their status from the dashboard.

## Features

### 1. Dashboard Overview
- **Manager Dashboard**: Navigate to `/dashboard` to see supplier statistics
- **Supplier Management Widget**: Shows real-time counts of suppliers by status:
  - Active Suppliers (green)
  - Under Review Suppliers (yellow) 
  - Revoked Suppliers (red)

### 2. Supplier Management Page
Navigate to `/suppliers` to access the full supplier management interface.

#### Key Features:
- **Search & Filter**: Search suppliers by name, contact, email, or category
- **Status Filters**: View suppliers by status (All, Active, Under Review, Revoked)
- **Real-time Statistics**: View supplier performance metrics
- **Action Buttons**: Manage supplier status directly from cards

#### Supplier Status Management:
1. **Active Suppliers**:
   - Can log in and access their dashboard
   - Action: "Deactivate" (moves to Under Review)

2. **Under Review Suppliers**:
   - Cannot log in (access temporarily restricted)
   - Actions: "Activate" or "Revoke"

3. **Revoked Suppliers**:
   - Cannot log in (access permanently denied)
   - Action: "Restore Access" (moves to Under Review)

### 3. Authentication Integration
The system automatically checks supplier status during login:

- **Active**: Login successful
- **Under Review**: Login blocked with message "Access temporarily restricted"
- **Revoked**: Login blocked with message "Access denied. Account has been revoked"

## How to Use

### Managing Supplier Access

1. **Deactivate an Active Supplier**:
   - Go to `/suppliers`
   - Find the supplier card
   - Click "Deactivate" button
   - Supplier status changes to "Under Review"
   - Supplier cannot log in until reactivated

2. **Activate a Supplier Under Review**:
   - Find supplier with "Under Review" status
   - Click "Activate" button
   - Supplier can now log in again

3. **Revoke Supplier Access**:
   - Find supplier with "Under Review" status
   - Click "Revoke" button
   - Confirm the action in the popup
   - Supplier access is permanently revoked

4. **Restore Revoked Supplier**:
   - Find supplier with "Revoked" status
   - Click "Restore Access" button
   - Supplier status changes to "Under Review"
   - Manager can then activate them if needed

### Adding New Suppliers
1. Click "Add Supplier" button on suppliers page
2. Fill out the supplier form
3. New suppliers start with "Active" status by default
4. They can immediately create accounts and log in

## Technical Details

### API Endpoints
- `GET /api/suppliers` - List all suppliers with filtering
- `PATCH /api/suppliers/[id]` - Update supplier status
- `DELETE /api/suppliers/[id]` - Revoke supplier (soft delete)

### Database Schema
Suppliers have a `status` field with values:
- `"active"` - Can log in and operate normally
- `"under_review"` - Temporarily restricted access
- `"revoked"` - Permanently denied access

### Security
- Supplier login attempts are validated against current status
- Status changes are immediately effective (no need to log out existing sessions)
- All status changes are logged with timestamps

## Best Practices

1. **Use "Under Review" for temporary issues**:
   - Payment disputes
   - Quality concerns
   - Pending documentation

2. **Use "Revoke" for permanent issues**:
   - Contract termination
   - Serious compliance violations
   - Fraudulent activity

3. **Monitor the dashboard regularly**:
   - Check supplier status distribution
   - Review pending approvals
   - Track supplier performance metrics

## Troubleshooting

**Q: Supplier says they can't log in**
A: Check their status in the supplier management page and activate if appropriate.

**Q: How to bulk update supplier status?**
A: Currently handled individually. Future versions may include bulk operations.

**Q: Can revoked suppliers be permanently deleted?**
A: Currently no - this preserves audit trail. Contact system administrator if needed.
