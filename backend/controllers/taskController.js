const Task = require("../models/Task");
const mongoose = require("mongoose");

exports.createTask = async (req, res) => {
  // console.log("requser", req.user);
  console.log("Create task request recieved");
  try {
    const { task } = req.body;
    const newTask = new Task({
      task,
      user: req.user.userId,
    });
    await newTask.save();
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

exports.getTask = async (req, res) => {
  console.log("Get task request recieved");

  try {
    const tasks = await Task.find({ user: req.user.userId });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

exports.updateTask = async (req, res) => {
  console.log("Updating task request recieved");
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      req.body,
    );
    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

exports.deleteTask = async (req, res) => {
  console.log("Delete task request received");
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });
    // console.log("Deleted task:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
