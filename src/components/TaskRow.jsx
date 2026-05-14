import { Check, Pencil, Trash2, Calendar } from "lucide-react";
import Button from "./Button";

const priorityConfig = {
  high: { label: "High", cls: "bg-red-50 text-red-600 border-red-200" },
  medium: { label: "Medium", cls: "bg-amber-50 text-amber-600 border-amber-200" },
  low: { label: "Low", cls: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

const priorityDot = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-emerald-400",
};


export default function TaskRow({ task, onToggle, onEdit, onDelete, isLast }) {
  const p = priorityConfig[task.priority] || priorityConfig.medium;
  const dot = priorityDot[task.priority] || priorityDot.medium;
  const isDone = task.status === "completed";

  return (
    <div
      className={`flex items-center gap-3 px-4 sm:px-6 py-4 group hover:bg-gray-50 transition-colors ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task)}
        title={isDone ? "Mark pending" : "Mark complete"}
        className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
          isDone
            ? "bg-indigo-600 border-indigo-600 shadow-sm"
            : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
        }`}
      >
        {isDone && <Check size={11} className="text-white" strokeWidth={3} />}
      </button>

      <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold ${
            isDone ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.name}
        </p>
        {task.description && (
          <p className="text-xs text-gray-400 truncate mt-0.5 font-normal">
            {task.description}
          </p>
        )}
        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 font-medium sm:hidden">
          <Calendar size={11} />
          {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>

      <span
        className={`hidden sm:inline text-xs px-2.5 py-0.5 rounded-full font-semibold border shrink-0 ${p.cls}`}
      >
        {p.label}
      </span>

      <span className="hidden sm:flex text-xs text-gray-400 shrink-0 items-center gap-1 font-medium">
        <Calendar size={12} />
        {new Date(task.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      <div className="flex items-center gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          variant="icon-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Pencil size={14} />
        </Button>
        <Button
          variant="icon-del"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}