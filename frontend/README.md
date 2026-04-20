# RBAC Frontend

This React frontend demonstrates session-based RBAC integration with a Spring Boot backend.

Quick start:

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run app:

```bash
npm start
```

Notes:
- Login calls `GET http://localhost:8080/api/user/profile` with basic auth to validate credentials.
- Role is derived from username (contains "admin" → ADMIN, else USER) and stored in `sessionStorage.role`.
- `UserDashboard` tries user endpoint and intentionally attempts admin endpoint to show denial.
- `AdminDashboard` only accessible to ADMIN role.

Required screenshots: Login UI, USER success, USER denied admin, ADMIN success, sessionStorage showing role.
