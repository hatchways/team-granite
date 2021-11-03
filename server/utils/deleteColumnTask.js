const Column = require("../models/column");
const Task = require("../models/task");

exports.deleteColumnTask = async (columnId, taskId) => {
 await Column.findOneAndUpdate({ _id: columnId }, {
  $pullAll: { tasks: [taskId], tasksSort: [taskId] }
 })
 await Task.deleteMany({ taskId: taskId, columnId: columnId })
}