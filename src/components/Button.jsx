const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

const variants = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm",
  add:
    "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm",

  edit:
    "bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-amber-700 border border-amber-200",
  delete:
    "bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 border border-red-200",

  timer:
    "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-md ring-2 ring-emerald-200",

  secondary:
    "bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-200 shadow-sm",
  danger:
    "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-sm",

  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600",
  icon:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-400 rounded-lg",
  "icon-edit":
    "bg-transparent hover:bg-amber-50 active:bg-amber-100 text-gray-400 hover:text-amber-600 rounded-lg",
  "icon-del":
    "bg-transparent hover:bg-red-50 active:bg-red-100 text-gray-400 hover:text-red-500 rounded-lg",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 h-8",
  md: "text-sm px-5 py-2.5 h-10",
  lg: "text-base px-7 py-3 h-12",
  icon: "w-8 h-8 p-0",
};

const iconVariants = ["icon", "icon-edit", "icon-del"];

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  title,
}) {
  const sizeKey = iconVariants.includes(variant) ? "icon" : size;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[sizeKey]} ${className}`}
    >
      {children}
    </button>
  );
}
