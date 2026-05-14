import { X, Plus } from "lucide-react";
import Button from "./Button";

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white";

/**
 * NoteModal — add / edit note modal
 */
export default function NoteModal({ editNote, form, setForm, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {editNote ? "Edit Note" : "New Note"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 font-normal">
              {editNote ? "Update your note below." : "Capture your thoughts and ideas."}
            </p>
          </div>
          <Button variant="icon" onClick={onClose} title="Close">
            <X size={18} />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Note title…"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Body <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={7}
              className={`${inputClass} resize-none`}
              placeholder="Write your note here…"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              variant={editNote ? "edit" : "add"}
              className="flex-1"
            >
              {editNote ? "Save Changes" : <><Plus size={15} /> Add Note</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}