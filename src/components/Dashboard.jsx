import FilterBar from "./FilterBar";
import StatusBadge from "./StatusBadge";

export default function Dashboard({
  students,
  loading,
  selectedStudentId,
  setSelectedStudentId,
  statusFilter,
  setStatusFilter,
  showLowAttendance,
  toggleLowAttendance,
  attendanceSortOrder,
  toggleAttendanceSortOrder,
}) {




  let filteredStudents = [...students];

  if (statusFilter !== "ALL") {
    filteredStudents = filteredStudents.filter((s) => s.status === statusFilter);
  }

  if (showLowAttendance) {
    filteredStudents = filteredStudents.filter((s) => s.attendance < 75);
  }

  if (attendanceSortOrder) {
    filteredStudents.sort((a, b) =>
      attendanceSortOrder === "asc"
        ? a.attendance - b.attendance
        : b.attendance - a.attendance,
    );
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg">Loading students...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-5">
      <div className="p-4 container">
        <header className="mb-4 page-header">
          <div>
            <h1 className="text-2xl font-bold">Student Attendance Tracker</h1>
            <p className="text-sm text-gray-600">
              Monitor student presence and attendance performance.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <p className="text-sm" style={{ margin: 0 }}>
              Total students: <span className="font-bold">{students.length}</span>
            </p>
          </div>
        </header>

        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showLowAttendance={showLowAttendance}
          toggleLowAttendance={toggleLowAttendance}
        />

        <div className="border border-gray-300 rounded mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Company
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-2 text-right">
                    <button
                      type="button"
                      onClick={toggleAttendanceSortOrder}
                      className="sort-btn"
                    >
                      Attendance %
                      <span className="ml-2">
                        {attendanceSortOrder === "asc" && "▲"}
                        {attendanceSortOrder === "desc" && "▼"}
                      </span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const isSelected = selectedStudentId === student.id;
                  const isHighAttendance = student.attendance >= 75;
                  const bgColor = isSelected ? "bg-blue-100" : "";

                  return (
                    <tr
                      key={student.id}
                      onClick={() => setSelectedStudentId(student.id)}
                      className={`cursor-pointer hover:bg-gray-100 ${bgColor}`}
                    >
                      <td className="border border-gray-300 p-2">
                        {student.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {student.email}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {student.company || "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="border border-gray-300 p-2 text-right font-bold">
                        <span
                          className={
                            isHighAttendance ? "text-green-600" : "text-red-600"
                          }
                        >
                          {student.attendance}%
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="border border-gray-300 p-4 text-center"
                    >
                      No students match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

