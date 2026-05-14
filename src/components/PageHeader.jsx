export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-7">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-0.5 font-normal">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}