import React, { useRef, useState } from "react";
import { MdAddTask } from "react-icons/md";
import type { List } from "./Components/TodoList";
import TodoItem from "./TodoItem";

const Taskify: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todone, setTodone] = useState<List[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      setTodone([...todone, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  // const toggleDone = (id: number) => {
  //   setTodone(
  //     todone.map((t) =>
  //       t.id === id ? { ...t, isDone: !t.isDone } : t
  //     )
  //   );
  // };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="app">
      <h2 className="heading">
        Task<span className="highlight">ify</span> <MdAddTask className="icon" />
      </h2>
      <h4>Add your Task or To do List here</h4><br />

      <form className="search-section" onSubmit={handleAdd}>
        <input
          type="input"
          ref={inputRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your task..."
          className="search-input"
        />
        <button className="add-btn">
          Add Task
        </button>
      </form>

      {/* To-do list display */}
      <div className="todo-container">
        {todone.length === 0 ? (
          <p className="empty">No tasks added yet.</p>
        ) :
        todone.map((t) => (
    <TodoItem key={t.id} todo={t} todos={todone} setTodos={setTodone} />
  ))
        }
      </div>
    </div>
  );
};

export default Taskify;
