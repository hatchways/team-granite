
const Column = require("../models/column");
const Task = require("../models/task");

exports.updateColumnTasksList = async ({ taskId, index }, columnId) => {
 //  pop the taskId if it exist
 await Column.findOneAndUpdate({ _id: columnId }, {
  $pullAll: { tasks: [taskId], tasksSort: [taskId] }
 });

 // update the Column with new taskId
 await Column.findOneAndUpdate({ _id: columnId }, {
  $push: {
   tasks: {
    $each: [taskId],
    $position: index
   },
   tasksSort: {
    $each: [taskId],
    $position: index
   }
  }
 })
}

exports.updateTargetColumnTasksList = async ({ taskId, index }, currentColumnId, targetColumnId,) => {
 //  pop the taskId if it exist
 await Column.findOneAndUpdate({ _id: currentColumnId }, {
  $pullAll: { tasks: [taskId], tasksSort: [taskId] }
 });

 // update the Column with new taskId
 await Column.findOneAndUpdate({ _id: targetColumnId }, {
  $push: {
   tasks: {
    $each: [taskId],
    $position: index
   },
   tasksSort: {
    $each: [taskId],
    $position: index
   }
  }
 })

 // update the task with its new targetId
 await Task.findOneAndUpdate({ _id: taskId, }, {
  $set: {
   columnId: targetColumnId
  }
 })
}
