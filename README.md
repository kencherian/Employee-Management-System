# Employee Management System (EMS) 🚀

A comprehensive, full-stack Employee Management System built with the **MERN** stack (MongoDB, Express, React, Node.js) and styled using **Tailwind CSS**. 

This application provides role-based access control (RBAC) separating **Admin** administrative controls from **Employee** self-service portals, featuring real-time state tracking, departmental management, profile image uploads, salary history calculations, and leave management workflows.

---

## 🌟 Key Features

### 🔑 Authentication & Security
- **Role-Based Access Control (RBAC):** Distinct dashboards and routing guards for `Admin` and `Employee` roles.
- **JWT Authentication:** Secure token-based session management with protected React routes.
- **Password Security:** Encrypted passwords stored using `bcryptjs`.

### 🛡️ Admin Portal
- **Dashboard Summary:** Overview statistics for total workforce, department distribution, monthly payroll, and leave activity metrics.
- **Department Management:** Full CRUD (Create, Read, Update, Delete) operations with inline search and pagination.
- **Employee Directory:** Manage employee onboarding, profile image uploads via `Multer`, departmental assignments, designations, and wage structures.
- **Payroll System:** Assign basic salary, allowances, and deductions to employees by department with automatic net calculations.
- **Leave Management:** Filter leave applications by status (`Pending`, `Approved`, `Rejected`), review applicant details, and approve/reject requests.

### 👤 Employee Portal
- **Personal Profile:** View individualized profile cards, contact info, and structural details.
- **Leave Requests:** Apply for casual, annual, or sick leave and track application status.
- **Pay Statements:** Access historical itemized salary receipts.
- **Account Settings:** Self-service password updates.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 (bootstrapped with Vite)
- **Styling:** Tailwind CSS, Styled-Components
- **Routing:** React Router DOM v6
- **Data Display:** `react-data-table-component`, `react-icons`
- **HTTP Client:** Axios

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database Object Modeling:** Mongoose (MongoDB)
- **Authentication & Security:** JSON Web Token (JWT), `bcryptjs`, CORS
- **File Processing:** Multer

---

## 📁 Project Structure

```text
EMS/
├── frontend/                # React Vite Client
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images & CSS stylesheets
│   │   ├── components/      # Modular UI components (Dashboard, Dept, Emp, Leave, Salary)
│   │   ├── context/         # AuthContext provider
│   │   ├── pages/           # AdminDashboard, EmployeeDashboard, Login
│   │   └── utils/           # Route guards & table helpers
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                  # Express & Node Backend
    ├── db/                  # Mongoose MongoDB connection
    ├── controllers/         # Request handlers (Auth, Dept, Emp, Leave, Salary, Setting)
    ├── middleware/          # JWT Token verification middleware
    ├── models/              # Database Schemas (User, Department, Employee, Leave, Salary)
    ├── public/uploads/      # Stored employee profile photos
    ├── routes/              # Express API endpoints
    ├── userSeed.js          # Default Admin database seeder
    └── index.js             # Main backend entry point
🚀 Local Installation & SetupPrerequisitesNode.js (v18 or higher recommended)MongoDB (Local instance running via MongoDB Compass or MongoDB Atlas cluster connection URI)1. Clone the RepositoryBashgit clone [https://github.com/your-username/Employee-Management-System.git](https://github.com/your-username/Employee-Management-System.git)
cd Employee-Management-System
2. Configure Environment VariablesInside server/, create a .env file:Code snippetPORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/ems
JWT_KEY=jwt_secret_key_ems_12345
3. Setup BackendBashcd server
npm install

# Seed default Admin account (email: admin@gmail.com, password: admin)
node userSeed.js

# Start the Node development server
npm start
4. Setup FrontendIn a new terminal window:Bashcd frontend
npm install

# Start the Vite development server
npm run dev
Open http://localhost:5173 in your browser to access the application.🔐 Default CredentialsRoleEmailPasswordAdminadmin@gmail.comadmin📄 LicenseThis project is open-source and available under the MIT License.