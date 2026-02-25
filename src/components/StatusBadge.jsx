export default function StatusBadge({ status }) {
  const isPresent = status === "Present";

  return (
    <span
      className={`px-2 py-1 text-sm font-bold ${
        isPresent
          ? "bg-green-200 text-green-800"
          : "bg-red-200 text-red-800"
      }`}
    >
      {status}
    </span>
  );
}

