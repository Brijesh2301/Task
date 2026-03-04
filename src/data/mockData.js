export const mockScans = [
  {
    id: 1, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 5, high: 8, medium: 12, low: 18 },
    lastScan: "4d ago", target: "app.company.com", startedAt: "Nov 22, 09:00AM",
    credentials: 2, files: "Control.pdf", checklists: "40/150",
  },
  {
    id: 2, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 3, high: 6, medium: 9, low: 14 },
    lastScan: "4d ago", target: "api.company.com", startedAt: "Nov 22, 10:00AM",
    credentials: 1, files: "API.pdf", checklists: "35/150",
  },
  {
    id: 3, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 4, high: 7, medium: 11, low: 16 },
    lastScan: "4d ago", target: "admin.company.com", startedAt: "Nov 22, 11:00AM",
    credentials: 3, files: "Admin.pdf", checklists: "42/150",
  },
  {
    id: 4, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 2, high: 5, medium: 8, low: 12 },
    lastScan: "4d ago", target: "cdn.company.com", startedAt: "Nov 22, 12:00PM",
    credentials: 1, files: "CDN.pdf", checklists: "28/150",
  },
  {
    id: 5, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 6, high: 9, medium: 14, low: 20 },
    lastScan: "4d ago", target: "portal.company.com", startedAt: "Nov 22, 01:00PM",
    credentials: 2, files: "Portal.pdf", checklists: "50/150",
  },
  {
    id: 6, name: "Web App Servers", type: "Greybox", status: "Completed",
    progress: 100, vulnerabilities: { critical: 1, high: 4, medium: 7, low: 10 },
    lastScan: "4d ago", target: "auth.company.com", startedAt: "Nov 22, 02:00PM",
    credentials: 2, files: "Auth.pdf", checklists: "22/150",
  },
  {
    id: 7, name: "Web App Servers", type: "Greybox", status: "Scheduled",
    progress: 100, vulnerabilities: { critical: 0, high: 3, medium: 5, low: 8 },
    lastScan: "4d ago", target: "staging.company.com", startedAt: "Nov 23, 09:00AM",
    credentials: 1, files: "Staging.pdf", checklists: "10/150",
  },
  {
    id: 8, name: "Web App Servers", type: "Greybox", status: "Scheduled",
    progress: 100, vulnerabilities: { critical: 0, high: 2, medium: 4, low: 6 },
    lastScan: "4d ago", target: "dev.company.com", startedAt: "Nov 23, 10:00AM",
    credentials: 1, files: "Dev.pdf", checklists: "8/150",
  },
  {
    id: 9, name: "IoT Devices", type: "Blackbox", status: "Failed",
    progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 1, low: 1 },
    lastScan: "4d ago", target: "192.168.1.0/24", startedAt: "Nov 22, 03:00PM",
    credentials: 0, files: "IoT.pdf", checklists: "5/150",
  },
  {
    id: 10, name: "Temp Data", type: "Blackbox", status: "Failed",
    progress: 10, vulnerabilities: { critical: 1, high: 3, medium: 2, low: 1 },
    lastScan: "3d ago", target: "temp.company.com", startedAt: "Nov 22, 04:00PM",
    credentials: 0, files: "Temp.pdf", checklists: "3/150",
  },
];

export const mockStats = {
  org: "Project X",
  owner: "Nammagiri",
  totalScans: 100,
  scheduled: 1000,
  recons: 100,
  failedScans: 100,
  critical: { count: 86, change: "+23", up: true },
  high:     { count: 16, change: "+0.3%", up: true },
  medium:   { count: 26, change: "+0.3%", up: true },
  low:      { count: 16, change: "+0.3%", up: false },
};

export const mockActivityLogs = [
  { time: "09:00:00", parts: [{ t: "text", v: "I'll begin a systematic penetration test on " }, { t: "link", v: "helpdesk.demoapp.com" }, { t: "text", v: ". Let me start with reconnaissance and enumeration." }] },
  { time: "09:01:20", parts: [{ t: "text", v: "Good! Target is online. Now let me perform port scanning to identify running services." }] },
  { time: "09:02:30", parts: [{ t: "text", v: "Excellent reconnaissance results: metabase.demoapp.com Apache httpd 2.4.46 on port 80 (web server). Let me probe the web server and target first to understand its structure." }] },
  { time: "09:04:10", parts: [{ t: "text", v: "Great! I found a login page for a Help Desk Platform. Username: " }, { t: "warn", v: "TODO: Delete the testing account (test/test)" }, { t: "text", v: ". Login redirects to " }, { t: "code", v: "/password/test" }, { t: "text", v: ". Let me follow that path." }] },
  { time: "09:04:50", parts: [{ t: "text", v: "POST method is not allowed on /password/test. The JavaScript posts to '/' — the current page. Let me try a different approach." }] },
  { time: "09:07:00", parts: [{ t: "text", v: "It redirects back to /password/test. Let me check other paths and try the " }, { t: "highlight", v: "fast-test" }, { t: "text", v: " password directly on other endpoints." }] },
  { time: "09:08:00", parts: [{ t: "text", v: "I can access the dashboard using the " }, { t: "highlight", v: "X-UserId: 100512" }, { t: "text", v: " header. This suggests an IDOR vulnerability — I can access any user's dashboard by changing the X-UserId header." }] },
];

export const mockFindings = [
  {
    id: 1, severity: "Critical", time: "09:01:13",
    title: "SQL Injection in Authentication Endpoint",
    path: "/api/v1/verify/file",
    description: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
  },
  {
    id: 2, severity: "High", time: "09:41:20",
    title: "Unauthorized Access to User Metadata",
    path: "/api/users/1",
    description: "Authenticated non-privilege user was able to access metadata of other users. Access control checks were missing.",
  },
  {
    id: 3, severity: "Medium", time: "09:45:23",
    title: "Broken Authentication Rate Limiting",
    path: "/api/v1/auth/1",
    description: "No effective rate limiting detected on login endpoint. Automation for brute force attempts possible.",
  },
];