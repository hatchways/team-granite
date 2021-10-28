
const Board = require("../models/board");
const Column = require("../models/column");
const Task = require("../models/task");

exports.deleteBoardBoard = async (boardId) => {
 const board = await Board.findOne({ _id: boardId });
 await board?.columnsSort.forEach(columnObjectId => {
  Column.deleteMany({ _Id: columnObjectId });
  Task.deleteMany({ columnId: columnObjectId })
 });
 await Board.deleteMany({ _id: boardId });
}