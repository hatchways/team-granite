
const Board = require("../models/board");

exports.createBoardBoard = async ({ name, userId }) => {
 // create the column
 let board = await new Board({
  name: name,
  userId: userId,
  columns: [],
  columnsSort: [],
 })
 await board.save();
 return board;
}