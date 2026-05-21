import React, { useEffect } from "react";
import { __values } from "./../../node_modules/tslib/tslib.es6";

const Home = () => {
  const [task, setTask] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

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
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  console.log("Tasks:", tasks);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("Please login to add tasks");
      return;
    }
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
      console.log(data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
      <ul className="divide-y divide-gray-200 px-4">
        <li className="py-4">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="todo1" className="ml-3 block text-gray-900">
              <span className="text-lg font-medium">
                Finish project proposal
              </span>
              <span className="text-sm font-light text-gray-500">
                Due on 4/1/23
              </span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
