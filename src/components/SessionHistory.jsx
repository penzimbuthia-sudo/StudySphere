import { Check } from "lucide-react";


export default function SessionHistory({ sessions, todaySessions }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 text-base">Session History</h2>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5">
          <span className="text-xs text-gray-500 font-medium">Today</span>
          <span className="text-sm font-extrabold text-indigo-600">{todaySessions.length}</span>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-4xl mb-3"></span>
          <p className="text-sm font-semibold text-gray-500">No sessions yet</p>
          <p className="text-xs text-gray-400 mt-0.5">Start a timer to record your first session.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {sessions
            .slice()
            .reverse()
            .map((s, i) => (
              <div
                key={s.id ?? i}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {s.label || "Focus Session"}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium">
                    {s.startedAt
                      ? new Date(s.startedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}{" "}
                    –{" "}
                    {s.endedAt
                      ? new Date(s.endedAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-bold text-gray-600">
                    {s.duration ? `${Math.round(s.duration / 60)} min` : "—"}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                    <Check size={12} className="text-emerald-600" strokeWidth={3} />
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
