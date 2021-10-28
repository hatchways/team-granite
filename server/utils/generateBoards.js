const Board = require("../models/board");
const { generateBoardColumns } = require("./generateBoardColumns");

exports.generateBoard = async (userId) => {
 let boards = await Board.find({ userId: userId }).populate({ path: "columns", populate: { path: "tasks" } }).populate("userId", "username  email register_date").lean() // => [{}]


 if (boards.length == 0) {
  let newBoard = await new Board({
   userId: userId,
   name: "my board",
  })
  let columns = await generateBoardColumns(newBoard._id);
  newBoard.columns = columns;
  newBoard.columnsSort = columns;
  await newBoard.save();
  // refetch the board data n populate
  boards = await Board.find({ userId: userId }).populate({ path: "columns", populate: { path: "tasks" } }).populate("userId", "username email register_date").lean()
 }
 return boards;
}