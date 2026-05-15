import { useState, useEffect } from "react";

const API = "https://studysphere-25ms.onrender.com";

const emptyForm = {
  name: "",
  description: "",
  priority: "medium",
  dueDate: "",
  status: "pending",
};

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchTasks = () =>
    fetch(`${API}/tasks`)
      .then((r) => r.json())
      .then(setTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditTask(null);
    setShowModal(true);
  };

  const openEdit = (task) => {
    setForm({
      name: task.name,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      status: task.status,
    });
    setEditTask(task);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTask) {
      await fetch(`${API}/tasks/${editTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
      });
    }
    setShowModal(false);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await fetch(`${API}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTasks();
  };

  const filtered = tasks
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterStatus === "all" || t.status === filterStatus)
    .filter((t) => filterPriority === "all" || t.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === "priority")
        return (
          ["high", "medium", "low"].indexOf(a.priority) -
          ["high", "medium", "low"].indexOf(b.priority)
        );
      return 0;
    });

  return {
    tasks,
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
  };
}