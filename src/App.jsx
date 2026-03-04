import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashBoardScreen1";
import ScanDetailScreen from "./screens/ScanDetailScreen";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LoginScreen />} />

      {/* Protected — Layout wrapper */}
      <Route element={<Layout />}>
  <Route path="/dashboard"     element={<DashboardScreen />} />
  <Route path="/scandetail"      element={<ScanDetailScreen />} />
  <Route path="/scans"         element={<ComingSoon name="Scans" />} />
  <Route path="/projects"      element={<ComingSoon name="Projects" />} />
  <Route path="/schedule"      element={<ComingSoon name="Schedule" />} />
  <Route path="/notifications" element={<ComingSoon name="Notifications" />} />
  <Route path="/settings"      element={<ComingSoon name="Settings" />} />
  <Route path="/support"       element={<ComingSoon name="Support" />} />
</Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// ComingSoon component
function ComingSoon({ name }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-dark-950 h-full">
      <div className="text-center">
        <div className="text-5xl mb-4">🚧</div>
        <p className="text-sm font-semibold text-gray-500">{name} — Coming soon</p>
      </div>
    </div>
  );
}