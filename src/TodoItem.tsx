import React, { useState } from "react";
import type { List } from "./Components/TodoList";
import { FaEdit, FaTrash, FaCheck, FaBell } from "react-icons/fa";

interface Props {
  todo: List;
  todos: List[];
  setTodos: React.Dispatch<React.SetStateAction<List[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  // Delete task
  const handleDelete = () => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  // Edit task
  const handleEdit = () => {
    setTodos(
      todos.map((t) => (t.id === todo.id ? { ...t, todo: editText } : t))
    );
    setEditMode(false);
  };

  // Mark task as done / completed
  const handleComplete = () => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, isDone: true } : t
      )
    );
    alert(`✅ Task "${todo.todo}" marked as completed!`);
  };

  return (
    <li className={`todo-item ${todo.isDone ? "done" : ""}`}>
      {editMode ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
        />
      ) : (
        <span>{todo.todo}</span>
      )}

      <div className="actions">
        {editMode ? (
          <button onClick={handleEdit} className="save-btn">
            <FaCheck />
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className="edit-btn">
            <FaEdit />
          </button>
        )}

        <button onClick={handleDelete} className="delete-btn">
          <FaTrash />
        </button>

        {!todo.isDone && (
          <button onClick={handleComplete} className="complete-btn">
            <FaBell /> Done
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
