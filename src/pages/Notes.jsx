import { Plus, Search } from "lucide-react";
import { useNotes } from "../hooks/useNotes";
import PageHeader from "../components/PageHeader";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import Button from "../components/Button";

export default function Notes() {
  const {
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
  } = useNotes();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Notes"
        subtitle="Write down your ideas, reminders and study notes."
        action={
          <Button variant="add" size="md" onClick={openAdd}>
            <Plus size={16} /> Add Note
          </Button>
        }
      />

      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700"
        />
      </div>

      {search && titleMatches && (
        <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
            Matching Titles ({titleMatches.length})
          </p>
          {titleMatches.length === 0 ? (
            <p className="text-sm text-gray-400 font-medium">No notes match "{search}"</p>
          ) : (
            <ul className="space-y-1.5">
              {titleMatches.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { setSearch(""); toggleExpand(n.id); }}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold hover:underline text-left"
                  >
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayNotes.length === 0 && !search && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">📝</span>
            <p className="text-sm font-semibold text-gray-500">No notes yet</p>
            <p className="text-xs text-gray-400 mt-0.5">Click Add Note to capture your first thought.</p>
          </div>
        )}
        {displayNotes.map((note, i) => (
          <NoteCard
            key={note.id}
            note={note}
            index={i}
            expanded={expandedId === note.id}
            onToggle={toggleExpand}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <NoteModal
          editNote={editNote}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}