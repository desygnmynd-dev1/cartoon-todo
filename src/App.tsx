import { useMemo, useState } from "react";
import "./cartoon.css";

type Task = { id: number; title: string; completed: boolean };
type View = "home" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Feed the dog 🐶", completed: false },
    { id: 2, title: "Math homework 📚", completed: false },
    { id: 3, title: "Draw a picture 🎨", completed: false },
  ]);

  const [input, setInput] = useState("");
  const [view, setView] = useState<View>("home");

  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const visibleTasks =
    view === "completed" ? tasks.filter((t) => t.completed) : tasks;

  return (
    <div className="cartoon-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="cartoon-card p-4 shadow-lg m-3">
        <h1 className="text-center mb-4 cartoon-title">
          Today’s Adventures! 🌟
        </h1>

        {/* Progress */}
        <div className="mb-4">
          <div className="fw-bold mb-1">
            {completedCount} of {tasks.length} tasks completed
          </div>
          <div className="progress rounded-pill">
            <div
              className="progress-bar bg-success"
              style={{
                width: `${tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Input */}
        <div className="input-group mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control form-control-lg rounded-start-pill"
            placeholder="Add a new adventure..."
          />
          <button
            onClick={addTask}
            className="btn btn-primary btn-lg rounded-end-pill"
          >
            +
          </button>
        </div>

        {/* Tasks */}
        <div className="d-flex flex-column gap-3">
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className={`cartoon-task p-3 d-flex justify-content-between align-items-center ${
                task.completed ? "task-complete" : ""
              }`}
            >
              <div className="d-flex align-items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="cartoon-check"
                />
                <span
                  className={`fw-bold ${
                    task.completed ? "text-muted text-decoration-line-through" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger rounded-pill"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Nav */}
        <div className="d-flex justify-content-around mt-4 pt-3 border-top">
          <button
            onClick={() => setView("home")}
            className="btn btn-link fw-bold"
          >
            Home
          </button>
          <button
            onClick={() => setView("completed")}
            className="btn btn-link fw-bold"
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}