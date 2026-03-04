export function VulnBadge({ count, type }) {
  const styles = {
    critical: "bg-red-500/20 text-red-400 border border-red-500/30",
    high:     "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    medium:   "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    low:      "bg-green-500/20 text-green-400 border border-green-500/30",
  };
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded text-[11px] font-bold ${styles[type]}`}
    >
      {count}
    </span>
  );
}

export function StatusChip({ status }) {
  const styles = {
    Completed:   "bg-green-500/10 text-green-400 border border-green-500/20",
    Scheduled:   "bg-gray-500/10 text-gray-400 border border-gray-500/20",
    Failed:      "bg-red-500/10 text-red-400 border border-red-500/20",
    "In Progress": "bg-teal-500/10 text-teal-500 border border-teal-500/20",
  };
  const dots = {
    Completed:   "bg-green-400",
    Scheduled:   "bg-gray-400",
    Failed:      "bg-red-400",
    "In Progress": "bg-teal-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${styles[status] ?? styles.Scheduled}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] ?? "bg-gray-400"}`} />
      {status}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-red-500 text-white",
    High:     "bg-orange-500 text-white",
    Medium:   "bg-yellow-400 text-black",
    Low:      "bg-green-500 text-white",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${styles[severity] ?? "bg-gray-500 text-white"}`}
    >
      {severity}
    </span>
  );
}