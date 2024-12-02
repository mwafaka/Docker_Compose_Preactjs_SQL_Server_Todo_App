import { useState, useEffect } from "preact/hooks";
import axios from "axios";
import "./app.css";

export function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Fetch todos on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // fetch task function
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/todos");
    setTodos(response.data);
  };

  // Add new todo
  const addTodo = async () => {
    if (task) {
      await axios.post("http://localhost:5000/api/todos", { task });
      setTask("");
      fetchTasks();
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };
 


  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 className="text-center mb-4">Todo List</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button
          className="btn btn-primary"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.task}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
