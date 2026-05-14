import { Plus } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import PageHeader from "../components/PageHeader";
import TaskFilters from "../components/TaskFilters";
import TaskRow from "../components/TaskRow";
import TaskModal from "../components/TaskModal";
import Button from "../components/Button";

export default function Tasks() {
  const {
    filtered,
    search, setSearch,
    filterStatus, setFilterStatus,
    filterPriority, setFilterPriority,
    sortBy, setSortBy,
    showModal,
    editTask,
    form, setForm,
    openAdd,
    openEdit,
    closeModal,
    handleSubmit,
    handleDelete,
    toggleComplete,
  } = useTasks();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Tasks"
        subtitle="Manage your tasks and keep track of your progress."
        action={
          <Button variant="add" size="md" onClick={openAdd}>
            <Plus size={16} /> Add Task
          </Button>
        }
      />

      <TaskFilters
        search={search} setSearch={setSearch}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        filterPriority={filterPriority} setFilterPriority={setFilterPriority}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">📋</span>
            <p className="text-sm font-semibold text-gray-500">No tasks found</p>
            <p className="text-xs text-gray-400 mt-0.5">Try adjusting your filters or add a new task.</p>
          </div>
        ) : (
          <>
            {filtered.map((task, i) => (
              <TaskRow
                key={task.id}
                task={task}
                isLast={i === filtered.length - 1}
                onToggle={toggleComplete}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium">
                {filtered.length} task{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <TaskModal
          editTask={editTask}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}