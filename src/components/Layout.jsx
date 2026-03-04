import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-full flex-shrink-0">
        <Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed((p) => !p)}
  mobileOpen={mobileOpen}
  onMobileClose={() => setMobileOpen(false)}
/>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-dark-900 border-b border-dark-700">
         <button
  onClick={() => setMobileOpen(true)}
  className="lg:hidden text-gray-500 hover:text-teal-500 text-xl transition"
>
  ☰
</button>
          <span className="font-extrabold text-base text-white">aps</span>
        </div>

        {/* Page renders here */}
        <Outlet />
      </div>
    </div>
  );
}