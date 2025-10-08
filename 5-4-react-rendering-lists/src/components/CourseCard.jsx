
import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // 📘 TASK 4 — PART A: Toggle task by ID
  function toggleTask(id) {
    onMutateCourse(index, (tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      )
    );
  }

  // 📘 TASK 4 — PART A: Delete task by ID
  function deleteTask(id) {
    onMutateCourse(index, (tasks) => tasks.filter((t) => t.id !== id));
  }

  // 📘 TASK 4 — PART A: Add new task
  function addTask(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      dueDate: date,
      isDone: false,
    };

    onMutateCourse(index, (tasks) => [...tasks, newTask]);
    setTitle("");
    setDate("");
  }

  // 🟩 PART A — Check if all tasks are done
  const allDone = course.tasks.length > 0 && course.tasks.every((t) => t.isDone);

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 Show badge when all tasks done */}
        {allDone && <span className="badge success">All caught up!</span>}
      </header>

      {/* 🟩 Conditional rendering for task list or empty message */}
      <section className="tasksSection">
        <ul className="tasks">
          {course.tasks.length === 0 ? (
            <li className="empty">No tasks yet. Add one below!</li>
          ) : (
            course.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </ul>
      </section>

      {/* Add Form (provided) */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">
            Add
          </button>
        </div>
      </form>
    </article>
  );
}

