## 📋 Project Overview

**eTuitionBD** is a digital marketplace connecting students with qualified tutors. Features role-based dashboards, tuition posting, tutor applications, payment processing, and admin controls.

### Core Features

✅ Firebase & Google OAuth | ✅ Tuition CRUD | ✅ Applications | ✅ Stripe Payments | ✅ Search & Filters | ✅ Role-based Dashboards | ✅ Admin Analytics

### Live URL

- https://spontaneous-beijinho-77cde9.netlify.app/

### Key Features

- **Sticky Navbar** - Always-visible navigation
- **Modal Forms** - Apply, edit tuition forms
- **Loading Spinners** - Full-screen loaders
- **Confirmation Dialogs** - For destructive actions
- **Status Badges** - Color-coded status display
- **Pagination** - 12 items per page
- **Search & Filter** - Subject, location, class filters
- **Sorting** - By budget, date

## 🔐 Authentication & Security

### Firebase Authentication

- Email/password registration & login
- Google OAuth integration
- Secure password storage
- User profile management

### JWT Token Management

- Token stored in localStorage
- Token included in API headers
- Token verification on protected routes
- Automatic logout on token expiration

## 📊 Dashboard Features

### Student Dashboard

- **My Tuitions** - CRUD operations (Create, Read, Edit, Delete)
- **Post Tuition** - Form with subject, class, budget, schedule
- **Applied Tutors** - Review applications, approve/reject, redirect to payment
- **Payments** - Transaction history with amounts & dates
- **Settings** - Update name, email, profile image

### Tutor Dashboard

- **My Applications** - Track status, delete pending applications
- **Ongoing Tuitions** - View approved & active tuitions
- **Revenue** - Earnings summary & transaction history

### Admin Dashboard

- **User Management** - List users, update info, change roles, delete accounts
- **Tuition Management** - Approve/reject pending tuition posts
- **Analytics** - Total earnings, user count, transaction stats

## 🔄 User Workflows

### Student Workflow

```
Register → Post Tuition → Wait for Applications
→ Review Tutors → Approve Tutor
→ Payment Checkout → Confirm Payment
→ Track Ongoing Tuition
```

### Tutor Workflow

```
Register → Browse Tuitions → Apply with Details
→ Wait for Approval → View Approved Tuition
→ Track Revenue
```

### Admin Workflow

```
Login as Admin → Review Tuitions → Approve/Reject
→ Manage Users → View Analytics
→ Monitor Platform
```

**Version:** 1.0.0  
**Last Updated:** December 17, 2025  
**Status:** Production Ready
