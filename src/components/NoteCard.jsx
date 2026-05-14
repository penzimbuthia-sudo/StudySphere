import { Pencil, Trash2 } from "lucide-react";
import Button from "./Button";

const cardColors = [
  "bg-indigo-50 border-indigo-100",
  "bg-amber-50 border-amber-100",
  "bg-emerald-50 border-emerald-100",
  "bg-pink-50 border-pink-100",
  "bg-sky-50 border-sky-100",
  "bg-violet-50 border-violet-100",
];

/**
 * NoteCard — single note card in the grid
 */
export default function NoteCard({ note, index, expanded, onToggle, onEdit, onDelete }) {
  const colorClass = cardColors[index % cardColors.length];

  return (
    <div
      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer ${colorClass} ${
        expanded ? "shadow-md" : "hover:shadow-sm"
      }`}
      onClick={() => onToggle(note.id)}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-bold text-gray-800 text-sm leading-snug flex-1">
          {note.title}
        </h3>
      </div>

      {/* Timestamp */}
      <p className="text-xs text-gray-400 font-medium mb-3">
        {new Date(note.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Body */}
      <p
        className={`text-sm text-gray-600 leading-relaxed font-normal ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {note.body}
      </p>

      {/* Actions */}
      <div
        className="flex items-center justify-end gap-2 mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="edit"
          size="sm"
          onClick={() => onEdit(note)}
          title="Edit note"
        >
          <Pencil size={13} /> Edit
        </Button>
        <Button
          variant="delete"
          size="sm"
          onClick={() => onDelete(note.id)}
          title="Delete note"
        >
          <Trash2 size={13} /> Delete
        </Button>
      </div>
    </div>
  );
}