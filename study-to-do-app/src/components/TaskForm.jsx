
import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (title.trim().length > 100) {
      setError("Title must be 100 characters or less.");
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        maxLength={100}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Add task description (optional)"
        value={description}
        maxLength={500}
        onChange={e => setDescription(e.target.value)}
      />

      <div className="form-bottom">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button type="submit">+ Add Task</button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
