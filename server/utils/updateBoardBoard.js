const Board = require("../models/board");

exports.updateBoardBoard = async ({ name }, boardId) => {
 if (name) {
  await Board.findOneAndUpdate({ _id: boardId }, {
   $set: {
    name: name,
   }
  })
 }
 let board = await Board.findOne({ _id: boardId });
 return board;
}