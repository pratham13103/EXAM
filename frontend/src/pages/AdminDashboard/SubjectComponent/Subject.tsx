import style from "./Subject.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface SubjectData {
  id: number;
  subject_name: string;
}

// Mock Backend Setup
const mockBackend = () => {
  const subjects: SubjectData[] = [
    { id: 1, subject_name: "Mathematics" },
    { id: 2, subject_name: "Science" },
  ];

  // Mock Axios requests
  axios.interceptors.request.use(async (config) => {
    const { method, url, data } = config;

    // Mocking GET /api/v1/subject
    if (method === "get" && url === "/api/v1/subject") {
      config.adapter = () =>
        Promise.resolve({
          data: subjects,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
    }

    // Mocking POST /api/v1/subject
    if (method === "post" && url === "/api/v1/subject") {
      const newSubject = {
        id: subjects.length + 1,
        ...JSON.parse(data),
      };
      subjects.push(newSubject);
      config.adapter = () =>
        Promise.resolve({
          data: newSubject,
          status: 201,
          statusText: "Created",
          headers: {},
          config,
        });
    }

    // Mocking DELETE /api/v1/subject/:id
    if (method === "delete" && url?.startsWith("/api/v1/subject/")) {
      const id = parseInt(url.split("/").pop() || "0", 10);
      const index = subjects.findIndex((subj) => subj.id === id);
      if (index >= 0) subjects.splice(index, 1);
      config.adapter = () =>
        Promise.resolve({
          data: { message: "Deleted" },
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
    }

    return config;
  });
};

function Subject() {
  mockBackend(); // Initialize the mock backend
  const [display, setDisplay] = useState(false);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [subject, setSubject] = useState({ subject_name: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await axios.get("/api/v1/subject");
        setSubjects(response.data);
      } catch {
        setError("Failed to fetch subjects.");
      }
    }
    fetchSubjects();
  }, []);

  const handleAddSubject = () => setDisplay(true);
  const handleCloseAdd = () => setDisplay(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject({ subject_name: e.target.value });
  };

  const handleAddNewSubject = async () => {
    try {
      const response = await axios.post("/api/v1/subject", subject);
      setSubjects([...subjects, response.data]);
      setSubject({ subject_name: "" });
      setDisplay(false);
    } catch {
      setError("Failed to add subject.");
    }
  };

  const deleteSubject = async (id: number) => {
    try {
      await axios.delete(`/api/v1/subject/${id}`);
      setSubjects(subjects.filter((subj) => subj.id !== id));
    } catch {
      setError("Failed to delete subject.");
    }
  };

  return (
    <div id={style.content}>
      {error && <div className={style.error}>{error}</div>}

      <div id={style.displayHeadingBox}>
        <h2>{subjects.length ? "Subject List" : "No Subject Available"}</h2>
      </div>

      {subjects.length > 0 && (
        <div id={style.tableBox}>
          <table>
            <thead>
              <tr>
                <th id={style.center}>Subject Name</th>
                <th id={style.center}>Options</th>
              </tr>
            </thead>
            <tbody id={style.tbody}>
              {subjects.map((data) => (
                <tr key={data.id}>
                  <td>{data.subject_name}</td>
                  <td>
                    <button onClick={() => deleteSubject(data.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div id={style.addSubjectBox}>
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>

      {display && (
        <div id={style.addBox}>
          <label htmlFor="subjectName">Enter Subject</label>
          <input
            id="subjectName"
            type="text"
            placeholder="Enter Subject name"
            value={subject.subject_name}
            onChange={handleInput}
          />
          <div id={style.buttonBox}>
            <button onClick={handleAddNewSubject}>Add</button>
            <button onClick={handleCloseAdd}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subject;
