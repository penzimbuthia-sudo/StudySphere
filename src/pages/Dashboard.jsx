import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckSquare, Clock, FileText, Timer, Play } from "lucide-react";
import StatCard from "../components/StatCard";

const API = "http://localhost:3001";

const priorityDot = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};

const priorityBadge = {
  high: "bg-red-50 text-red-600 border border-red-200",
  medium: "bg-amber-50 text-amber-600 border border-amber-200",
  low: "bg-emerald-50 text-emerald-600 border border-emerald-200",
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);
    fetch(`${API}/notes`).then(r => r.json()).then(setNotes);
    fetch(`${API}/sessions`).then(r => r.json()).then(setSessions);
  }, []);

  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const upcoming = tasks.filter(t => t.status !== "completed").slice(0, 4);
  const todaySessions = sessions.filter(s => new Date(s.startedAt).toDateString() === new Date().toDateString());

  const completionPct = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionPct / 100) * circumference;

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good Morning" : now.getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {greeting}, Penzi! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5 font-normal">
            Stay consistent and achieve your goals.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2 font-medium">
          <Clock size={14} /> {dateStr}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard icon={CheckSquare} label="Total Tasks" value={tasks.length} sub="All time tasks" color="bg-indigo-500" />
        <StatCard icon={CheckSquare} label="Completed" value={completed} sub="Tasks done" color="bg-emerald-500" />
        <StatCard icon={Clock} label="Pending" value={pending} sub="Tasks left" color="bg-orange-400" />
        <StatCard icon={Timer} label="Study Sessions" value={todaySessions.length} sub="Today" color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-bold text-gray-900 text-base">Upcoming Tasks</h2>
            <Link to="/tasks" className="text-indigo-500 text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.length === 0 && (
              <p className="text-gray-400 text-sm font-medium">No upcoming tasks.</p>
            )}
            {upcoming.map((task) => (
              <div key={task.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[task.priority] || "bg-gray-400"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{task.name}</p>
                    <p className="text-xs text-gray-400 font-medium">
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold border shrink-0 ${
                    priorityBadge[task.priority] || ""
                  }`}
                >
                  {task.priority
                    ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
                    : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Study Progress */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 text-base mb-4 sm:mb-5">Study Progress</h2>
          <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8">
            <svg width="140" height="140" viewBox="0 0 160 160" className="shrink-0">
              <circle cx="80" cy="80" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
              <circle
                cx="80" cy="80" r={radius} fill="none"
                stroke="#6366f1" strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
              <text
                x="80" y="76"
                textAnchor="middle"
                style={{ fill: "#111827", fontSize: "24px", fontWeight: "800", fontFamily: "Inter, sans-serif" }}
              >
                {completionPct}%
              </text>
              <text
                x="80" y="97"
                textAnchor="middle"
                style={{ fill: "#6b7280", fontSize: "11px", fontWeight: "500", fontFamily: "Inter, sans-serif" }}
              >
                Tasks Completed
              </text>
            </svg>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0" />
                <span className="text-sm font-semibold text-gray-700">{completed} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
                <span className="text-sm font-semibold text-gray-700">{pending} Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                <span className="text-sm font-semibold text-gray-700">0 Overdue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Note */}
        {notes[0] && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-base">Quick Note</h2>
              <span className="text-xs text-gray-400 font-medium">
                {new Date(notes[0].updatedAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{notes[0].title}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 font-normal">{notes[0].body}</p>
            <Link
              to="/notes"
              className="text-indigo-500 text-xs mt-3 inline-block font-semibold hover:underline"
            >
              View all notes →
            </Link>
          </div>
        )}

        {/* Start Study Session */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Timer size={20} className="text-emerald-500" />
            <span className="text-sm font-bold text-gray-700 tracking-tight">Start Study Session</span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 tabular-nums">25:00</p>
          <Link
            to="/timer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-base font-semibold px-7 py-3 h-12 rounded-xl transition-all shadow-md ring-2 ring-emerald-200"
          >
            <Play size={17} fill="white" /> Start Timer
          </Link>
        </div>
      </div>
    </div>
  );
}