import { Search } from "lucide-react";
import Button from "./Button";

export default function TaskFilters({
  search, setSearch,
  filterStatus, setFilterStatus,
  filterPriority, setFilterPriority,
  sortBy, setSortBy,
}) {
  const inputClass =
    "border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 font-medium";

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
      {/* Search */}
      <div className="relative w-full sm:w-auto">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} pl-8 w-full sm:w-52`}
        />
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
        {["all", "pending", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              filterStatus === s
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Priority filter */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        className={inputClass}
      >
        <option value="all">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={inputClass}
      >
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
      </select>
    </div>
  );
}