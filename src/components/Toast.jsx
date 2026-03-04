import { useState, useEffect } from "react";

let toastFn = null;

export function useToast() {
  return {
    toast: (msg, type = "info") => toastFn && toastFn(msg, type)
  };
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastFn = (msg, type) => {
      const id = Date.now();
      setToasts(p => [...p, { id, msg, type }]);
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
    };
    return () => { toastFn = null; };
  }, []);

  const colors = {
    info: "bg-teal-500",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-orange-500"
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`${colors[t.type] || colors.info} text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-slide-in`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}