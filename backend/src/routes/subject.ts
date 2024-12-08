import express, { Request, Response } from "express";

const router = express.Router();

let subjects = [
  { id: 1, subject_name: "Mathematics" },
  { id: 2, subject_name: "Science" },
  { id: 3, subject_name: "History" },
];

// Route to get all subjects
router.get("/", (_req: Request, res: Response) => {
  res.json(subjects);
});

// Route to add a subject
router.post("/", (req: Request, res: Response) => {
  const { subject_name } = req.body;

  if (!subject_name) {
    return res.status(400).json({ error: "Subject name is required" });
  }

  const newSubject = { id: subjects.length + 1, subject_name };
  subjects.push(newSubject);
  res.status(201).json(newSubject);
});

// Route to delete a subject
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const subjectId = parseInt(id, 10);
  subjects = subjects.filter((subject) => subject.id !== subjectId);

  res.status(200).json({ message: "Subject deleted successfully" });
});

export { router };
