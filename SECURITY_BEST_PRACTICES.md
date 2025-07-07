# Security Best Practices for SplyBob CRM

## Overview
This document outlines security best practices implemented and recommended for the SplyBob CRM application.

## Environment Variables & Secrets Management

### ✅ DO:
- Use environment variables for all sensitive configuration
- Never commit `.env*` files to version control
- Use the provided `.env.example` template for setup
- Generate strong, unique JWT secrets (minimum 32 characters)
- Use MongoDB connection strings with proper authentication

### ❌ DON'T:
- Hardcode secrets in source code
- Include credentials in debug logs
- Share environment files via email or chat
- Use default or weak JWT secrets

## Database Security

### MongoDB Best Practices:
- Use MongoDB Atlas with IP whitelist restrictions
- Implement database-level authentication
- Use connection pooling (configured in `lib/mongodb.ts`)
- Set appropriate timeout values to prevent connection hanging
- Regularly rotate database credentials

## Authentication & Authorization

### Password Security:
- Passwords are hashed using bcryptjs with salt rounds of 12
- Never log password values or hashes
- Implement password strength requirements in frontend

### JWT Token Management:
- Tokens expire after 7 days
- Include user role in token payload for authorization
- Validate tokens on every protected route
- Clear tokens on logout

### Session Management:
- Store tokens in localStorage (consider httpOnly cookies for enhanced security)
- Implement automatic token refresh if needed
- Clear sessions on security events

## Supplier Access Control

### Status-Based Access:
- `active`: Full access to supplier dashboard
- `under_review`: Login blocked, temporary restriction
- `revoked`: Login blocked, permanent restriction

### Implementation:
- Status checked during login (`checkSupplierStatus`)
- Status changes take effect immediately
- All status changes should be logged for audit

## Code Security

### Debug & Logging:
- Remove all debug console.log statements from production
- Never log sensitive information (passwords, tokens, personal data)
- Use structured logging in production environment
- Implement proper error handling without exposing internals

### API Security:
- Validate all input parameters
- Implement rate limiting
- Use HTTPS in production
- Set appropriate CORS policies
- Add request validation middleware

## Development Security

### Local Development:
- Use unique credentials for development environment
- Never use production data in development
- Keep dependencies updated
- Run security audits regularly: `npm audit`

### Code Review:
- Review all authentication/authorization changes
- Check for hardcoded secrets before merging
- Validate input sanitization
- Ensure proper error handling

## Production Deployment

### Environment Setup:
1. Generate new, strong JWT secret
2. Configure MongoDB with production credentials
3. Set NODE_ENV=production
4. Enable HTTPS
5. Configure proper logging
6. Set up monitoring and alerting

### Regular Maintenance:
- Rotate JWT secrets periodically
- Update dependencies regularly
- Monitor for failed login attempts
- Review access logs regularly
- Backup database regularly

## Incident Response

### Security Events:
- Suspicious login attempts
- Unauthorized access attempts
- Data breaches
- System vulnerabilities

### Response Process:
1. Isolate affected systems
2. Assess impact and scope
3. Notify stakeholders
4. Implement fixes
5. Document lessons learned
6. Update security measures

## Compliance & Auditing

### Data Protection:
- Implement data retention policies
- Provide data export/deletion capabilities
- Maintain audit logs
- Document data processing activities

### Regular Reviews:
- Security code reviews
- Penetration testing
- Dependency vulnerability scans
- Access control audits

## Emergency Contacts

### Security Issues:
- Report security vulnerabilities immediately
- Contact system administrator for credential resets
- Escalate data breaches according to company policy

## Implementation Checklist

- [ ] Environment variables properly configured
- [ ] Debug logging removed from production code
- [ ] Strong JWT secret generated
- [ ] MongoDB access properly secured
- [ ] Error handling implemented without information disclosure
- [ ] Input validation on all API endpoints
- [ ] HTTPS configured in production
- [ ] Regular security scans scheduled
- [ ] Incident response plan documented
- [ ] Team trained on security practices

---

**Last Updated:** $(date +%Y-%m-%d)
**Version:** 1.0
