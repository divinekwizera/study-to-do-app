
import { useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import "./App.css";

const STORAGE_KEY = "professional-todo-tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function showMessage(message, type = "success") {
    setNotification({ message, type });
  }

  function addTask(task) {
    setTasks(previous => [
      ...previous,
      {
        ...task,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date().toISOString()
      }
    ]);
    showMessage("Task added successfully!");
  }

  function toggleTask(id) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(id, updates) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    showMessage("Task updated successfully!");
  }

  function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    setTasks(previous => previous.filter(task => task.id !== id));
    showMessage("Task deleted successfully!");
  }

  function clearCompleted() {
    if (!tasks.some(task => task.completed)) return;

    if (!window.confirm("Clear all completed tasks?")) return;

    setTasks(previous => previous.filter(task => !task.completed));
    showMessage("Completed tasks cleared!");
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const remaining = tasks.filter(task => !task.completed).length;
  const completed = tasks.filter(task => task.completed).length;

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <div className="logo">✓</div>
          <h1>My Todo List</h1>
          <p>Organize your day. Get things done.</p>
        </header>

        {notification && (
          <Notification
            notification={notification}
            onClose={() => setNotification(null)}
          />
        )}

        <section className="task-form-section">
          <h2>Add a New Task</h2>
          <TaskForm onAdd={addTask} />
        </section>

        <section className="tasks-section">
          <div className="section-heading">
            <h2>Your Tasks</h2>
            <span>{remaining} pending</span>
          </div>

          <SearchBar
            search={search}
            onSearch={setSearch}
          />

          <FilterBar
            filter={filter}
            onChange={setFilter}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        </section>

        <Footer
          remaining={remaining}
          completed={completed}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}

export default App;
