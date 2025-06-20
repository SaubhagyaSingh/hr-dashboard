CORE HR Dashboard
A modern, theme-aware HR Dashboard built with Next.js 15, TailwindCSS, NextAuth.js, and React Context API. This dashboard provides a user-friendly interface for managing employee data, featuring search, filtering, bookmarking, and analytics.

Visit the site at :https://hr-dashboard-uswt.vercel.app/

📦 Tech Stack

Next.js 15 (App Router)
React 19
Tailwind CSS 4 (with PostCSS)
NextAuth.js (Credential-based authentication)
React Context API (Global state management)
Lucide React Icons (Icon library)
Chart.js + react-chartjs-2 (Data visualization)
Radix UI & Headless UI (Accessible UI components)
next-themes (Dark/Light theme toggle)
Excalidraw (App structure diagram)


🚀 Features

🔐 Secure Authentication: Credential-based login (test@gmail.com / test123)
🌙 Theme Support: Light/Dark mode with toggle
🔎 Search & Filter: Filter employees by name, email, or department
📚 Bookmark Employees: Save and view bookmarked employees in a dedicated tab
📊 Analytics Dashboard: Visualize employee data with Chart.js
⛔ Protected Routes: Secured with NextAuth middleware
🌐 Persistent Login: JWT-based session management
🧠 Global State: Managed via React Context API
🧾 Excalidraw Diagram: Visualize app structure and flow


📁 Project Structure
hr-dashboard/
├── src/
│   ├── app/                    # App Router pages (login, home, bookmark, analytics)
│   ├── components/             # Reusable components (Navbar, EmpCard, FilterSection, LogoutButton, etc.)
│   ├── context/                # EmployeeContext.tsx for global state management
│   └── data/                   # Static JSON data for employees
├── public/
│   └── logo.png                # App logo
├── middleware.ts               # NextAuth middleware for route protection
├── .env                        # Environment variables
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── excalidraw.excalidraw       # Excalidraw diagram for app structure
├── package.json                # Project dependencies
└── README.md                   # Project documentation


🔧 Installation & Setup

Clone the repository:
git clone https://github.com/your-username/hr-dashboard.git
cd hr-dashboard


Install dependencies:
npm install


Set up environment variables:Create a .env file in the root directory:
touch .env

Add the following:
NEXTAUTH_SECRET=your_strong_secret_here

Generate a secure secret:
openssl rand -base64 32


Run the application:
npm run dev

The app will be available at http://localhost:3000.



🧪 Demo Credentials

Email: test@gmail.com
Password: test123


🛡 Route Protection
Routes are protected using middleware.ts. Only the following routes are publicly accessible:

/ (Landing page)
/login (Login screen)
/api/* (API routes)
/_next/*, /favicon.ico (Static assets)

All other routes (/home, /bookmark, /analytics) redirect to /login if the user is not authenticated.



Route
Description



/
Landing page


/login
Login screen with validation


/home
List of all employees


/bookmark
View bookmarked employees


/analytics
Employee analytics with charts



🧩 Excalidraw Diagram
An excalidraw.excalidraw file is included in the root directory. To view the app's structure and flow:

Visit Excalidraw.
Import the excalidraw.excalidraw file.


📝 Notes

Ensure the NEXTAUTH_SECRET is set in the .env file for secure authentication.
The app uses static JSON data in src/data/ for demo purposes. Replace with a real database for production.
Tailwind CSS is configured with PostCSS for optimal styling.


Built with ❤️ by Saubhagya Singh
