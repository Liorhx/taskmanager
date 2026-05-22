import React, { useEffect } from "react";
import { __values } from "./../../node_modules/tslib/tslib.es6";
import EditForm from "../components/EditForm";

const Home = () => {
  const [task, setTask] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/task", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("Fetch tasks response status:", response.status);
        if (response.status === 401 || response.status === 400) {
          // This explicitly deletes the string from the application tab
          localStorage.removeItem("authToken");

          // Send them away so they can't see the broken dashboard
          window.location.href = "/login";
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  console.log("Todos:", todos);

  const handleToggle = async (index) => {
    const previoustodos = [...todos];
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      }),
    );
    try {
      const response = await fetch(
        `http://localhost:5000/api/task/${todos[index]._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            completed: !todos[index].completed,
          }),
        },
      );
      const data = await response.json();
      console.log("Toggle task response:", data);
    } catch (error) {
      setTodos(previoustodos);
      console.error("Error updating task:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("Please login to add tasks");
      return;
    }
    const previousTodos = [...todos];
    setTodos([...todos, { task }]);
    try {
      const response = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ task }),
      });
      const data = await response.json();
      console.log("Add Task response:", data);
    } catch (error) {
      setTodos(previousTodos);
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (index) => {
    const previousTodos = [...todos];
    setTodos(todos.filter((_, i) => i !== index));
    try {
      const response = await fetch(
        `http://localhost:5000/api/task/${todos[index]._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "applicaiton/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      console.log("Delete task response:", data);
    } catch (error) {
      setTodos(previousTodos);
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async (index) => {
    setEditId(index);
    setIsEditing(true);
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto px-4 py-2"
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="task"
            onChange={handleChange}
            placeholder="Add a task"
          />
          <button
            className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      {isEditing && (
        <EditForm
          todo={todos[editId]}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <ul className="divide-y divide-gray-200 px-4"></ul>

      {todos.map((todo, index) => {
        return (
          <li key={index} className="py-4">
            <div className="flex items-center">
              <input
                id={`todo${index}`}
                name={`todo${index}`}
                checked={todo.completed}
                onChange={() => handleToggle(index)}
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label
                htmlFor={`todo${index}`}
                className="ml-3  text-gray-900 w-full flex items-center justify-between"
              >
                <span className="text-lg font-medium">{todo.task}</span>
                <div>
                  <button
                    onClick={() => {
                      handleEdit(index);
                    }}
                    className="bg-blue-500 mr-2 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </label>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default Home;
