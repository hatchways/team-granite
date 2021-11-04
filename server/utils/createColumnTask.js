const Task = require("../models/task");
const { updateColumnTasksList } = require("./updateColumnTasksList");

exports.createColumnTask = async ({ name, description, index }, columnId) => {
 // create the column
 let task = await new Task({
  name: name,
  description: description || "",
  columnId: columnId,
 })
 await task.save();
 // update the Column Task List board
 await updateColumnTasksList({ taskId: task._id, index }, columnId);

 return task;
}