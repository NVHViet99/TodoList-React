import { useMemo, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
const initialState = [
  {
    id: "0",
    todo: "Go to school",
    status: "new",
  },
  {
    id: "1",
    todo: "Feed the dog",
    status: "completed",
  },
  {
    id: "2",
    todo: "To do homework",
    status: "new",
  },
];
function TodoList() {
  const [todos, setTodos] = useState(initialState);
  const [filteredStatus, setFilteredStatus] = useState("all");

  const handleTodo = (todo) => {
    if (!todo.todo || todo.tod === "") return;

    const newTodo = [todo, ...todos];
    setTodos(newTodo);
  };

  const handleDelete = (id, index) => {
    const newTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  const handleToggleStatus = (todoId, index) => {
    const newTodo = [...todos];

    const updatedTodos = newTodo.map((todo) => {
      if (todo.id === todoId) {
        if (todo.status === "new" || todo.status === "completed")
          todo = {
            ...todo,
            status: todo.status === "new" ? "completed" : "new",
          };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (todoId, newValue) => {
    if (!newValue || newValue === "") return;
    setTodos((pre) =>
      pre.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const handleShowAll = () => {
    setFilteredStatus("all");
  };
  const handleShowNew = () => {
    setFilteredStatus("new");
  };
  const handleShowCompleted = () => {
    setFilteredStatus("completed");
  };

  const rederTodoList = useMemo(() => {
    return todos.filter(
      (todo) => filteredStatus === "all" || filteredStatus === todo.status
    );
  }, [filteredStatus, todos]);

  return (
    <>
      <TodoForm onSubmit={handleTodo} />
      <div>
        <button onClick={handleShowAll} className="btn-show">
          All Todos
        </button>
        <button onClick={handleShowNew} className="btn-show">
          New Todos
        </button>
        <button onClick={handleShowCompleted} className="btn-show">
          Completed Todos
        </button>
      </div>
      <Todo
        todos={rederTodoList}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
      />
    </>
  );
}

export default TodoList;
