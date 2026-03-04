import { useState } from "react";
import Header from "../components/Header";
import { VulnBadge, StatusChip } from "../components/Badges";
import { mockScans, mockStats } from "../data/mockData";
import { useToast } from "../context/ToastContext1";
import { MdOutlineError } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";

function SeverityCard({ label, count, change, up, icon, countColor }) {
  return (
    <div className="bg-white dark:bg-dark-850  px-5 py-4 flex items-start justify-between gap-2">
      <div>
        <p className="text-xs text-gray-500 mb-1.5">{label}</p>
        <p className={`text-3xl font-extrabold mb-1 text-black dark:text-white`}>{count}</p>
        <p className="text-[11px]">
          <span className={up ? "text-red-400" : "text-green-400"}>
            {up ? "↑" : "↓"} {change}
          </span>{" "}
          <span className="text-gray-400 dark:text-gray-600">from yesterday</span>
        </p>
      </div>
      <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-[5px] bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] text-gray-400 dark:text-gray-500 w-8 text-right">{value}%</span>
    </div>
  );
}

function ScanRow({ scan, onClick }) {
  return (
    <tr
      onClick={() => onClick(scan)}
      className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-white/[0.025] cursor-pointer transition-colors group"
    >
      <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">{scan.name}</td>
      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{scan.type}</td>
      <td className="px-4 py-3 whitespace-nowrap"><StatusChip status={scan.status} /></td>
      <td className="px-4 py-3"><ProgressBar value={scan.progress} /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <VulnBadge count={scan.vulnerabilities.critical} type="critical" />
          <VulnBadge count={scan.vulnerabilities.high}     type="high" />
          <VulnBadge count={scan.vulnerabilities.medium}   type="medium" />
          <VulnBadge count={scan.vulnerabilities.low}      type="low" />
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{scan.lastScan}</td>
    </tr>
  );
}

export default function DashboardScreen({ onScanClick }) {
  const { toast } = useToast();
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = mockScans.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter;
    return matchSearch && matchFilter;
  });

const severities = [
  { label: "Critical Severity", ...mockStats.critical, icon: <MdOutlineError   className="text-red-400    text-2xl" />, countColor: "text-red-400"    },
  { label: "High Severity",     ...mockStats.high,     icon: <IoWarning         className="text-orange-400 text-2xl" />, countColor: "text-orange-400" },
  { label: "Medium Severity",   ...mockStats.medium,   icon: <RiErrorWarningFill className="text-yellow-400 text-2xl" />, countColor: "text-yellow-400" },
  { label: "Low Severity",      ...mockStats.low,      icon: <BsInfoCircleFill  className="text-blue-400   text-2xl" />, countColor: "text-blue-400"   },
];

  const btnGhost =
    "px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition";

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-dark-950 overflow-hidden">
      <Header
        breadcrumbs={["Scan", "Private Assets", "New Scan"]}
        actions={
          <div className="flex gap-2">
            <button onClick={() => toast("Report exported!", "success")} className={btnGhost}>
              Export Report
            </button>
            <button
              onClick={() => toast("Opening scan wizard...", "info")}
              className="px-3 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-md shadow-md shadow-teal-500/20 transition"
            >
              + New Scan
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-4 sm:p-5 flex flex-col gap-4">
        {/* Org stats bar */}
        <div className="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-md px-4 sm:px-5 py-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            ["Org",          mockStats.org],
            ["Owner",        mockStats.owner],
            ["Total Scans",  mockStats.totalScans],
            ["Scheduled",    mockStats.scheduled],
            ["Recons",       mockStats.recons],
            ["Failed Scans", mockStats.failedScans],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{value}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-dot" />
            10 mins ago
          </div>
        </div>

        {/* Severity cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {severities.map((s) => <SeverityCard key={s.label} {...s} />)}
        </div>

        {/* Scan table */}
        <div className="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-md overflow-hidden flex flex-col flex-1 min-h-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 px-4 py-3 border-b border-gray-200 dark:border-dark-700">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"

                placeholder="Search scans..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            <div className="flex items-center gap-2 ml-auto flex-wrap">
              <div className="relative">
                <button
                  onClick={() => setShowFilter((p) => !p)}
                  className={`${btnGhost} flex items-center gap-1.5`}
                >
                <IoFilter /> Filter
                  {filter !== "All" && (
                    <span className="bg-teal-500 text-white text-[10px] px-1.5 rounded font-bold">
                      {filter}
                    </span>
                  )}
                </button>
                {showFilter && (
                  <div className="absolute top-full mt-1 right-0 z-30 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl shadow-2xl min-w-[140px] overflow-hidden">
                    {["All", "Completed", "Scheduled", "Failed"].map((f) => (
                      <button
                        key={f}
                        onClick={() => { setFilter(f); setShowFilter(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs transition hover:bg-teal-500/10 ${
                          f === filter ? "text-teal-500 font-bold bg-teal-500/10" : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => toast("Columns toggled", "info")}
                className={`${btnGhost} flex items-center gap-1.5`}
              >
                ⊞ Columns
              </button>

              <button
                onClick={() => toast("Opening new scan wizard...", "info")}
                className="px-3 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-sm shadow-teal-500/20 transition"
              >
                + New scan
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-700">
                  {["Scan Name", "Type", "Status", "Progress", "Vulnerability", "Last Scan"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((scan) => (
                  <ScanRow key={scan.id} scan={scan} onClick={onScanClick} />
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400 dark:text-gray-600">
                      No scans match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}