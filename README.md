# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# FenrirTask

A cybersecurity scanning dashboard built with React. The app lets you monitor active scans, track vulnerabilities by severity, and dig into scan details — all wrapped in a clean UI with dark/light mode support.

---

## What's Inside

- **Dashboard** — overview of all scans with severity stats (Critical, High, Medium, Low)
- **Scan Detail** — live console output, step tracker, and a finding log per scan
- **Sidebar** — collapsible navigation that works on both desktop and mobile
- **Dark / Light Mode** — toggle between themes from anywhere in the app
- **React Router v7** — proper URL-based navigation between screens

---

## Tech Stack

| Tool | Version | Why |
|------|---------|-----|
| React | 19 | UI |
| React Router DOM | 7 | Routing |
| React Icons | 5 | Icons |
| Tailwind CSS | 3 | Styling |
| Vite | 7 | Build tool |
| ESLint | 9 | Linting |

---

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/fenrirtask.git
cd fenrirtask
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Top bar with breadcrumbs and actions
│   ├── Sidebar.jsx       # Collapsible sidebar navigation
│   ├── Layout.jsx        # Wrapper layout for protected screens
│   ├── Badges.jsx        # Severity and status badges
│   └── ThemeToggle.jsx   # Dark/light mode toggle button
├── context/
│   ├── ThemeContext.jsx   # Global theme state
│   └── ToastContext.jsx   # Toast notification state
├── screens/
│   ├── LoginScreen.jsx       # Sign up / login page
│   ├── DashboardScreen.jsx   # Main scan overview
│   └── ScanDetailScreen.jsx  # Per-scan live detail view
├── data/
│   └── mockData.js       # Mock scans, stats, logs, findings
├── App.jsx               # Route definitions
├── main.jsx              # App entry point
└── index.css             # Tailwind imports + base styles
```

---

## Tailwind Dark Mode

This project uses Tailwind's `class` strategy for dark mode. The `dark` class is toggled on the `<html>` element via `ThemeContext`. Make sure your `tailwind.config.js` has:

```js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // ...
}
```

---

## Notes

- Mock data is used throughout — no backend or API calls
- The sidebar collapses to icon-only mode on desktop and slides in as a drawer on mobile
- Toast notifications are handled globally via `ToastContext`