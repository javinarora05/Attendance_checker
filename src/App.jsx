import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

const STORAGE_KEY = "student-attendance-list";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showLowAttendance, setShowLowAttendance] = useState(false);
  const [attendanceSortOrder, setAttendanceSortOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStudents(parsed);
        setLoading(false);
        return;
      } catch {
        console.log("error")
      }
    }

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=10");
        const data = await res.json();

        const augmented = data.map((user) => {
          const attendance = Math.floor(Math.random() * 51) + 50;
          const status = Math.random() < 0.5 ? "Present" : "Absent";
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company?.name ?? "",
            attendance,
            status,
          };
        });

        setStudents(augmented);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(augmented));
      } catch (e) {
        console.error("Failed to fetch students", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }
  }, [students]);

  const toggleLowAttendance = () => {
    setShowLowAttendance((prev) => !prev);
  };

  const toggleAttendanceSortOrder = () => {
    setAttendanceSortOrder((prev) => {
      if (prev === "asc") return "desc";
      if (prev === "desc") return "asc";
      return "asc";
    });
  };

  return (
    <Dashboard
      students={students}
      loading={loading}
      selectedStudentId={selectedStudentId}
      setSelectedStudentId={setSelectedStudentId}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      showLowAttendance={showLowAttendance}
      toggleLowAttendance={toggleLowAttendance}
      attendanceSortOrder={attendanceSortOrder}
      toggleAttendanceSortOrder={toggleAttendanceSortOrder}
    />
  );
}

export default App;
