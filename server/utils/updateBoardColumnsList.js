
const Board = require("../models/board");
const Column = require("../models/column");

exports.updateBoardColumnsList = async (boardId, columnId, index) => {
 //  pop the columnId if it exist
 await Board.findOneAndUpdate({ "_id": boardId, "columns": columnId }, {
  $pullAll: { columns: [columnId], columnsSort: [columnId] }
 });

 // update the user board
 await Board.findOneAndUpdate({ _id: boardId }, {
  $push: {
   columns: {
    $each: [columnId],
    $position: index
   },
   columnsSort: {
    $each: [columnId],
    $position: index
   }
  }
 })
}
