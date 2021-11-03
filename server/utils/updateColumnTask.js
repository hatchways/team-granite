const Task = require("../models/task");
const { updateColumnTasksList, updateTargetColumnTasksList } = require("./updateColumnTasksList");

exports.updateColumnTask = async ({ name, description, targetColumnId, index }, currentColumnId, taskId) => {
 if (name) {
  await Task.findOneAndUpdate({ _id: taskId }, {
   $set: {
    name: name,
   }
  })
 }
 if (description) {
  await Task.findOneAndUpdate({ _id: taskId }, {
   $set: {
    description: description,
   }
  })
 }
 if (index >= 0) {
  // update the user board
  if (targetColumnId) {
   await updateTargetColumnTasksList({ taskId, index }, currentColumnId, targetColumnId);
  } else {
   await updateColumnTasksList({ taskId, index }, currentColumnId);
  }
 }
 let task = await Task.findOne({ _id: taskId });
 return task;
}