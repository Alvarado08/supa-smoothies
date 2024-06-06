export default function OrderBadge({ name, orderSlug, isSelected, onClick }) {
  return (
    <span
      className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs font-medium ${
        isSelected
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800 cursor-pointer"
      }`}
      onClick={onClick}
    >
      {name}
    </span>
  );
}
