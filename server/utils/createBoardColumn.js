const Column = require("../models/column");
const { updateBoardColumnsList } = require("./updateBoardColumnsList");

exports.createBoardColumn = async ({ name, index }, boardId) => {
 // create the column
 let column = await new Column({
  name: name,
  boardId: boardId,
  task: [],
 })
 await column.save();
 // update the user board
 await updateBoardColumnsList(boardId, column._id, index)
 return column;
}