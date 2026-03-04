import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { SeverityBadge } from "../components/Badges";
import { mockActivityLogs, mockFindings } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const STEPS = ["Spidering", "Mapping", "Testing", "Validating", "Reporting"];

function CircularProgress({ value }) {
  const r    = 44;
  const circ = 2 * Math.PI * r;
  const dash = circ - (value / 100) * circ;

  return (
    <div className="relative w-28 h-28 flex-shrink-0">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e5e7eb" className="dark:[stroke:#1e2430]" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#0CC8A8" strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-extrabold text-teal-500 leading-none">{value}%</span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">In Progress</span>
      </div>
    </div>
  );
}

function StepTracker({ activeStep }) {
  return (
    <div className="flex items-center flex-1 min-w-0 overflow-x-auto">
      {STEPS.map((step, i) => {
        const isActive = i === activeStep;
        const isDone   = i < activeStep;
        return (
          <div key={step} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/40"
                    : isDone
                    ? "bg-teal-500/25 text-teal-400"
                    : "bg-gray-200 dark:bg-dark-700 text-gray-400 dark:text-gray-500"
                }`}
              >
                {isDone ? "✓" : i + 1}
              </div>
              <span
                className={`text-[11px] mt-1.5 whitespace-nowrap font-medium transition-colors ${
                  isActive ? "text-teal-500" : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-4 transition-colors duration-300 ${
                  isDone ? "bg-teal-500/35" : "bg-gray-200 dark:bg-dark-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function LogEntry({ log }) {
  const partStyle = {
    text:      "text-gray-600 dark:text-gray-300",
    link:      "text-teal-500 dark:text-teal-400",
    warn:      "text-yellow-500 dark:text-yellow-400 bg-yellow-400/10 px-1 rounded",
    code:      "text-orange-500 dark:text-orange-400 bg-orange-400/10 px-1 rounded font-mono",
    highlight: "text-violet-500 dark:text-violet-400 bg-violet-400/10 px-1 rounded",
  };
  return (
    <div className="flex gap-2.5 py-1 text-[12px] font-mono leading-relaxed">
      <span className="text-teal-500/60 flex-shrink-0 w-[72px]">[{log.time}]</span>
      <span>
        {log.parts.map((p, i) => (
          <span key={i} className={partStyle[p.t] ?? "text-gray-600 dark:text-gray-300"}>
            {p.v}
          </span>
        ))}
      </span>
    </div>
  );
}

function FindingCard({ finding }) {
  return (
    <div className="bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <SeverityBadge severity={finding.severity} />
        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{finding.time}</span>
      </div>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">{finding.title}</p>
      <p className="text-[11.5px] text-teal-500 mb-2 font-mono">{finding.path}</p>
      <p className="text-[11.5px] text-gray-500 leading-relaxed">{finding.description}</p>
    </div>
  );
}

export default function ScanDetailScreen({ scan }) {
  const { toast }   = useToast();
  const [tab, setTab]           = useState("activity");
  const [running, setRunning]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [step, setStep]         = useState(0);
  const [logs, setLogs]         = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    let idx = 0;
    const logT = setInterval(() => {
      if (idx < mockActivityLogs.length) {
        setLogs((p) => [...p, mockActivityLogs[idx++]]);
      } else clearInterval(logT);
    }, 900);
    const progT = setInterval(() => {
      setProgress((p) => {
        if (p >= 0) { clearInterval(progT); setRunning(false); return 0; }
        const n = Math.min(p + 1, 100);
        setStep(Math.min(Math.floor(n / 100 * (STEPS.length - 0.01)), STEPS.length - 1));
        return n;
      });
    }, );
    return () => { clearInterval(logT); clearInterval(progT); };
  }, [running]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const metaItems = [
    { label: "Scan Type",   value: scan?.type        || "Grey Box" },
    { label: "Targets",     value: scan?.target       || "Google.com" },
    { label: "Started At",  value: scan?.startedAt    || "Nov 22, 09:00AM" },
    { label: "Credentials", value: `${scan?.credentials ?? 2} Active` },
    { label: "Files",       value: scan?.files        || "Control.pdf" },
    { label: "Checklists",  value: scan?.checklists   || "40/150" },
  ];

  const btnGhost =
    "px-3.5 py-1.5 text-xs font-medium border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition";

  const tabCls = (t) =>
    `px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
      tab === t
        ? "border-teal-500 text-teal-500"
        : "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
    }`;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-dark-950 overflow-hidden">
      <Header
        breadcrumbs={["Scan", "Private Assets", "New Scan"]}
        actions={
          <div className="flex gap-2">
            <button onClick={() => toast("Exporting report...", "success")} className={btnGhost}>
              Export Report
            </button>
            {running ? (
              <button
                onClick={() => { setRunning(false); toast("Scan stopped.", "warning"); }}
                className="px-3.5 py-1.5 text-xs font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Stop Scan
              </button>
            ) : (
              <button
                onClick={() => { setRunning(true); setProgress(0); setStep(0); setLogs([]); toast("Scan restarted!", "info"); }}
                className="px-3.5 py-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
              >
                Restart Scan
              </button>
            )}
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-4 sm:p-5 flex flex-col gap-4">
        {/* Progress + Step tracker */}
        <div className="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <CircularProgress value={progress} />
          <StepTracker activeStep={step} />
        </div>

        {/* Meta row */}
        <div className="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-xl px-5 py-3 flex flex-wrap gap-x-6 gap-y-3">
          {metaItems.map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{value}</p>
            </div>
          ))}
        </div>

        {/* Split panels */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          {/* Live Console */}
          <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-xl overflow-hidden min-h-[360px] lg:min-h-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-dark-700 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-dot" />
                <span className="text-sm font-semibold text-teal-500">Live Scan Console</span>
                {running && <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">Running...</span>}
              </div>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-base transition">⤢</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-dark-700 flex-shrink-0">
              <button className={tabCls("activity")}     onClick={() => setTab("activity")}>Activity Log</button>
              <button className={tabCls("verification")} onClick={() => setTab("verification")}>Verification Loops</button>
            </div>

            {/* Console body */}
            <div
              ref={logRef}
              className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-dark-950 text-xs font-mono"
            >
              {tab === "activity" ? (
                <>
                  {logs.map((log, i) => <LogEntry key={i} log={log} />)}
                  {logs.length === 0 && (
                    <p className="text-gray-400 dark:text-gray-600">Initializing scan engine...</p>
                  )}
                  {running && logs.length > 0 && (
                    <div className="flex gap-1 mt-3">
                      {[1, 2, 3].map((i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full bg-teal-500 bounce-delay-${i}`} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  {[
                    { t: "Checking CSRF token bypass...",        done: true },
                    { t: "Testing IDOR on /api/users/*",         done: true },
                    { t: "Verifying rate-limit bypass on /auth", done: false },
                    { t: "Re-testing SQL injection payloads",    done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                      <span className="text-teal-500">→</span>
                      {item.t}
                      <span className={`ml-auto px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.done ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                      }`}>
                        {item.done ? "Verified" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Findings panel */}
          <div className="w-full lg:w-[300px] flex flex-col flex-shrink-0">
            <div className="flex-1 flex flex-col bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-xl overflow-hidden min-h-[280px] lg:min-h-0">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700 flex-shrink-0">
                <h3 className="text-[13.5px] font-bold text-gray-800 dark:text-gray-200">Finding Log</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {mockFindings.map((f) => <FindingCard key={f.id} finding={f} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-2.5 flex flex-wrap items-center gap-4 text-xs flex-shrink-0">
          {[["Sub-Agents", "2"], ["Parallel Executions", "2"], ["Operations", "1"]].map(([label, val]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-gray-400 dark:text-gray-500">{label}</span>
              <span className="bg-teal-500/15 text-teal-500 px-2 py-0.5 rounded font-bold">{val}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-red-400">Critical 1</span>
            <span className="text-orange-400">High 1</span>
            <span className="text-yellow-400">Medium 1</span>
            <span className="text-green-400">Low 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}