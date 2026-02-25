const FILTERS = ["ALL", "Present", "Absent"];

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  showLowAttendance,
  toggleLowAttendance,
}) {

  return (
    <div className="mb-4 p-2">
      <div className="mb-2">
        {FILTERS.map((filter) => {
          const isActive = statusFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`mr-2 px-3 py-1 border ${
                isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {filter === "ALL" ? "All" : filter}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleLowAttendance}
        className="text-sm font-medium"
      >
        <input type="checkbox" checked={showLowAttendance} readOnly className="mr-2" />
        Show Low Attendance (&lt;75%)
      </button>
    </div>
  );
}

