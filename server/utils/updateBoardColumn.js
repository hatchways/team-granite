const Column = require("../models/column");
const { updateBoardColumnsList } = require("./updateBoardColumnsList");

exports.updateBoardColumn = async ({ name, index }, boardId, columnId) => {
 if (name) {
  await Column.findOneAndUpdate({ _id: columnId }, {
   $set: {
    name: name,
   }
  })
 }
 if (index >= 0) {
  // update the user board
  await updateBoardColumnsList(boardId, columnId, index)
 }
 let column = await Column.findOne({ _id: columnId });
 return column;
}