import React, { useEffect, useRef, useState } from "react";

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 1000),
      todo: input,
      status: "new",
    });
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {edit ? (
        <>
          <input
            type="text"
            placeholder="Update your todo"
            value={input}
            className="todo-input"
            onChange={handleInputChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add new todo"
            value={input}
            className="todo-input"
            onChange={handleInputChange}
            ref={inputRef}
          />
          <button className="todo-button">Add to do</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
