import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export default function Header({ breadcrumbs = [], actions }) {
  const { isDark } = useTheme();

  return (
    <header className={`w-full px-5 py-3 flex items-center justify-between border-b transition-colors duration-200 flex-shrink-0 ${
      isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    }`}>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className={isDark ? "text-gray-600" : "text-gray-300"}>/</span>
            )}
            <span className={
              i === breadcrumbs.length - 1
                ? "text-teal-500 font-medium"
                : isDark ? "text-gray-500" : "text-gray-400"
            }>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {actions}
        <ThemeToggle />
      </div>

    </header>
  );
}