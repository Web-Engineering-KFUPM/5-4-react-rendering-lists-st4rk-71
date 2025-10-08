
import DueBadge from "./DueBadge";
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task" key={task.id}>
      <label className="taskMain">
        {/* 🟩 PART B — Checkbox triggers toggle */}
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.id)}
        />

        {/* 🟩 PART B — Only show DueBadge if NOT done */}
        {!task.isDone && <DueBadge dueDate={task.dueDate} />}

        {/*  Title */}
        <span className="title">{task.title}</span>
      </label>

      {/* 🟩 PART B — Delete button */}
      <button
        className="ghost"
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
}
