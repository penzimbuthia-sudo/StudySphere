import { useState, useEffect } from "react";

const API = "https://studysphere-25ms.onrender.com";
const emptyForm = { title: "", body: "" };

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState(null);

  const fetchNotes = () =>
    fetch(`${API}/notes`)
      .then((r) => r.json())
      .then(setNotes);

  useEffect(() => {
    fetchNotes();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditNote(null);
    setShowModal(true);
  };

  const openEdit = (note) => {
    setForm({ title: note.title, body: note.body });
    setEditNote(note);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    if (editNote) {
      await fetch(`${API}/notes/${editNote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, updatedAt: now }),
      });
    } else {
      await fetch(`${API}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: now, updatedAt: now }),
      });
    }
    setShowModal(false);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    await fetch(`${API}/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  const toggleExpand = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  // Title-only search results
  const titleMatches = search
    ? notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const displayNotes = titleMatches || notes;

  return {
    notes,
    displayNotes,
    titleMatches,
    search, setSearch,
    showModal,
    editNote,
    form, setForm,
    expandedId,
    openAdd,
    openEdit,
    closeModal,
    handleSubmit,
    handleDelete,
    toggleExpand,
  };
}