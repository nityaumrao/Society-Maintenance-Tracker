# 🏢 Society Maintenance Tracker

A full-stack web application that helps apartment societies efficiently manage maintenance complaints, notices, and resident communication. Residents can submit complaints with optional photos, while administrators track progress, assign priorities, post notices, and monitor maintenance activities through a dashboard.

---

# 🚀 Features

## Resident

- Register and Login
- Email Verification
- Raise Maintenance Complaints
- Upload Complaint Photos (Optional)
- Track Complaint Status
- View Complete Complaint History
- View Society Notices

---

## Admin

- View All Complaints
- Filter Complaints by Status, Category, and Date
- Update Complaint Status
- Set Complaint Priority
- Mark Complaints as Overdue
- Create Important Notices
- View Dashboard Statistics

---

## Complaint Lifecycle

```
Resident
      │
      ▼
Raise Complaint
      │
      ▼
OPEN
      │
      ▼
IN_PROGRESS
      │
      ▼
RESOLVED
      │
      ▼
CLOSED
```

Every status change is automatically recorded in the Complaint History table.

---

# 📊 Dashboard

The admin dashboard provides:

- Total Complaints
- Open Complaints
- In Progress Complaints
- Resolved Complaints
- High Priority Complaints
- Overdue Complaints
- Complaints by Category

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- shadcn/ui
- TypeScript

## Backend

- Next.js API Routes
- Auth.js
- Drizzle ORM

## Database

- PostgreSQL
- Neon Database

## Authentication

- Credentials Login
- Email Verification
- OAuth Ready
- Role-Based Authorization

## Email

- Resend

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── (auth)/
│   ├── (protected)/
│   └── api/
│
├── components/
│   ├── complaint/
│   ├── dashboard/
│   ├── notice/
│   └── ui/
│
├── lib/
│   ├── dbconfig/
│   ├── queries/
│   └── helpers/
│
└── services/
```

---

# 🗄 Database Tables

- User
- Account
- Complaint
- ComplaintHistory
- Notice
- VerificationToken
- ResetPasswordToken
- TwoFactorTokens
- TwoFactorConfirmation

---

# 🔐 Authentication

The application uses **Auth.js** with role-based authentication.

Supported features:

- Email Verification
- Secure Password Hashing
- Forgot Password
- Reset Password
- Two-Factor Authentication
- OAuth Support

---

# 📸 Complaint Management

Residents can submit complaints with:

- Title
- Category
- Description
- Priority
- Optional Photo

Administrators can:

- Update Status
- Assign Priority
- Add Resolution Notes
- Track Complaint History

---

# 📢 Notice Board

Administrators can:

- Create Notices
- Pin Important Notices
- Notify Residents via Email

Residents can:

- View All Notices
- View Pinned Notices

---

# 📈 Dashboard Analytics

Displays:

- Complaint Status Summary
- Complaint Categories
- Overdue Complaints
- Priority Distribution

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/nityaumrao/Society-Maintenance-Tracker.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=

AUTH_SECRET=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate database migrations

```bash
npm run drizzle:generate
```

Push schema

```bash
npm run drizzle:push
```

Run the development server

```bash
npm run dev
```

---

# 📦 Available Scripts

```bash
npm run dev

npm run build

npm run start

npm run drizzle:generate

npm run drizzle:migrate

npm run drizzle:push

npm run lint
```

---

# 🚀 Deployment

Recommended platforms:

- Vercel
- Neon PostgreSQL
- Resend

---

# 📄 Future Improvements

- Real-time Notifications
- Mobile Responsive Dashboard
- Complaint Image Gallery
- Admin Reports Export
- SMS Notifications
- Resident Profile Management

---

# 👩‍💻 Author

**Nitya Umrao**

B.Tech Computer Science (Cyber Security)

Pranveer Singh Institute of Technology

---

# 📜 License

This project is developed for academic purposes.
