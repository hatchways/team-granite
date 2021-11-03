
const Board = require("../models/board");
const Column = require("../models/column");
const Task = require("../models/task");

exports.deleteBoardColumn = async (boardId, columnId) => {
 await Board.findOneAndUpdate({ _id: boardId }, {
  $pullAll: { columns: [columnId], columnsSort: [columnId] }
 })
 await Column.deleteMany({ _Id: columnId });
 await Task.deleteMany({ columnId: columnId })
}