import React, { useState } from "react";
import "./style.css";
import TodoForm from "./TodoForm";
function Todo({ todos, onDelete, onToggleStatus, onEdit }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    onEdit(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const handleDelete = (todo, index) => {
    if (onDelete) onDelete(todo.id);
  };

  const hanleToggleStatus = (todo, index) => {
    if (onToggleStatus) onToggleStatus(todo.id, index);
  };

  return (
    <div className="todo-item">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className={todo.status === "new" ? "todo-row" : "todo-row complete"}
        >
          <li key={todo.id} onClick={() => hanleToggleStatus(todo, index)}>
            {todo.todo}{" "}
          </li>
          <div className="btn-container">
            <button
              onClick={() => handleDelete(todo, index)}
              className="btn btn-delete"
            >
              Delete
            </button>
            <button
              onClick={() => setEdit({ id: todo.id, value: todo.todo })}
              className="btn btn-edit"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
