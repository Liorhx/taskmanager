import React from "react";

const EditForm = ({ todo, onSave, onCancel }) => {
  const [task, setTask] = React.useState(todo.task);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            name="task"
            onChange={handleChange}
            placeholder="Add a task"
          />
          <button
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
