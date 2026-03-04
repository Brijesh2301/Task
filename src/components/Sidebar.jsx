import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCalendar2Week } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

const NAV_ITEMS = [
  { id: "dashboard", path: "/dashboard", icon: <MdDashboard        size={18} />, label: "Dashboard"    },
  { id: "projects",  path: "/projects",  icon: <FaFolder            size={16} />, label: "Projects"     },
  { id: "scans",     path: "/scandetail",icon: <HiMagnifyingGlass   size={17} />, label: "Scans"        },
  { id: "schedule",  path: "/schedule",  icon: <BsCalendar2Week     size={16} />, label: "Schedule"     },
];

const BOTTOM_ITEMS = [
  { id: "notifications", path: "/notifications", icon: <IoNotificationsOutline size={18} />, label: "Notifications" },
  { id: "settings",      path: "/settings",      icon: <IoSettingsOutline      size={18} />, label: "Settings"      },
  { id: "support",       path: "/support",       icon: <BiSupport              size={18} />, label: "Support"       },
];

function NavBtn({ item, active, onClick, collapsed }) {
  return (
    <button
      onClick={() => onClick(item.path)}
      title={collapsed ? item.label : ""}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 overflow-hidden ${
        active
          ? "bg-teal-500/15 text-teal-500"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/5"
      }`}
    >
      {/* icon directly render hoga */}
      <span className="flex-shrink-0 flex items-center justify-center">
        {item.icon}
      </span>
      {!collapsed && (
        <span className="whitespace-nowrap transition-opacity duration-200">
          {item.label}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item) => {
    if (item.id === "scans") {
      return location.pathname === "/scans" || location.pathname.startsWith("/scan/");
    }
    return location.pathname === item.path;
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (onMobileClose) onMobileClose(); // mobile me click hone pe close ho
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          flex flex-col h-full border-r
          bg-white dark:bg-dark-900
          border-gray-200 dark:border-dark-700
          transition-all duration-300 flex-shrink-0
          fixed lg:relative z-50 lg:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-16" : "w-56"}
        `}
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center gap-2.5 px-4 py-[14px] border-b border-gray-200 dark:border-dark-700 flex-shrink-0">
          <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-white dark:bg-dark-900" />
          </div>
          {!collapsed && (
            <span className="font-extrabold text-[17px] text-gray-900 dark:text-white">aps</span>
          )}

          {/* Desktop collapse button */}
          <button
            onClick={onToggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-auto text-gray-400 dark:text-gray-500 hover:text-teal-500 text-sm transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
          >
            {collapsed ? "→" : "←"}
          </button>

          {/* Mobile close button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden ml-1 text-gray-400 hover:text-red-400 text-lg transition p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavBtn
              key={item.id}
              item={item}
              active={isActive(item)}
              onClick={handleNavigate}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="px-2 py-2 border-t border-gray-200 dark:border-dark-700 flex flex-col gap-0.5">
          {BOTTOM_ITEMS.map((item) => (
            <NavBtn
              key={item.id}
              item={item}
              active={isActive(item)}
              onClick={handleNavigate}
              collapsed={collapsed}
            />
          ))}
        </div>

        {/* User */}
        <div className="flex items-center gap-2.5 px-3 py-3 border-t border-gray-200 dark:border-dark-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            A
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">admin@aps.com</p>
                <p className="text-[11px] text-teal-500">Security Lead</p>
              </div>
              <span className="ml-auto text-gray-400 dark:text-gray-500 text-base">›</span>
            </>
          )}
        </div>
      </aside>
    </>
  );
}