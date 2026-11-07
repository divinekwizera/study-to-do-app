
import { useState } from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function saveEdit() {
    if (!title.trim()) {
      alert("Task title cannot be empty.");
      return;
    }

    onEdit(task.id, {
      title: title.trim(),
      description: description.trim()
    });

    setEditing(false);
  }

  function cancelEdit() {
    setTitle(task.title);
    setDescription(task.description);
    setEditing(false);
  }

  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label="Mark task as completed"
      />

      <div className="task-content">
        {editing ? (
          <>
            <input
              value={title}
              maxLength={100}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              maxLength={500}
              onChange={e => setDescription(e.target.value)}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </>
        )}

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority} Priority
        </span>
      </div>

      {!editing && (
        <div className="task-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default TaskItem;
