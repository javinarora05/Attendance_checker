export default function StatusBadge({ status }) {
  const isPresent = status === "Present";

  return (
    <span className={isPresent ? "status-present" : "status-absent"}>
      {status}
    </span>
  );
}

