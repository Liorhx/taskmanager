import React from "react";
import { useEffect } from "react";

const EditForm = ({ todo, todos, setTodos, onSave, onCancel }) => {
  console.log("EditForm received todo:", todo);
  const [taskToEdit, setTaskToEdit] = React.useState(todo.task);

  useEffect(() => {
    setTaskToEdit(todo.task);
  }, [todo]);

  const handleChange = (e) => {
    setTaskToEdit(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const previousTodos = [...todos];
    setTodos(
      todos.map((t) => (t._id === todo._id ? { ...t, task: taskToEdit } : t)),
    );
    try {
      const response = await fetch(
        `http://localhost:5000/api/task/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ task: taskToEdit }),
        },
      );
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Edit task response:", data);
    } catch (error) {
      setTodos(previousTodos);
      console.error("Error updating task:", error);
    }
    // Handle save logic here
    onSave();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto px-4 py-2"
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name=""
            value={taskToEdit}
            onChange={handleChange}
            placeholder="Add a task"
          />
          <button
            type="button"
            className=" bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className=" bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
