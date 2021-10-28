const asyncHandler = require("express-async-handler");
const Board = require("../models/board");
const Column = require("../models/column");
const { createBoardBoard } = require("../utils/createBoardBoard");
const { createBoardColumn } = require("../utils/createBoardColumn");
const { createColumnTask } = require("../utils/createColumnTask");
const { deleteBoardBoard } = require("../utils/deleteBoardBoard");
const { deleteBoardColumn } = require("../utils/deleteBoardColumn");
const { deleteColumnTask } = require("../utils/deleteColumnTask");
const { generateBoard } = require("../utils/generateBoards");
const { updateBoardBoard } = require("../utils/updateBoardBoard");
const { updateBoardColumn } = require("../utils/updateBoardColumn");
const { updateColumnTask } = require("../utils/updateColumnTask");

// @route GET /kaban/homeBoard
// @access Protected
exports.homeBoard = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  let boards = await generateBoard(userId);
  res.status(200)
  res.json({ success: true, boards })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route POST /kaban/board
// @access Protected
exports.createBoard = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name } = req.body;
  let board = await createBoardBoard({ name, userId });
  res.status(200)
  res.json({ success: true, board })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route PUT /kaban/board
// @access Protected
exports.updateBoard = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name } = req.body;
  const { board_id } = req.params;
  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(401)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(401)
   return res.send("Hey!😁, you are not authorized")
  }
  let updatedBoard = await updateBoardBoard({ name }, board_id)
  res.status(200)
  res.json({ success: true, board: updatedBoard })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route DELETE /kaban/board
// @access Protected
exports.deleteBoard = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { board_id } = req.params;
  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(401)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(401)
   return res.send("Hey!😁, you are not authorized")
  }
  await deleteBoardBoard(board_id);
  res.status(200)
  res.json({ success: true })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route POST /column/:board_id
// @access Protected
exports.createColumn = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name, index } = req.body;
  const { board_id } = req.params;
  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(401)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(401)
   return res.send("Hey!😁, you are not authorized")
  }
  let column = await createBoardColumn({ name, index }, board_id);
  res.status(200)
  res.json({ success: true, column })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route PUT /column/:board_id
// @access Protected
exports.updateColumn = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name, index } = req.body;
  const { board_id, column_id } = req.params;
  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(401)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(401)
   return res.send("Hey!😁, you are not authorized")
  }
  let column = await updateBoardColumn({ name, index }, board_id, column_id);
  res.status(200)
  res.json({ success: true, column })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route PUT /column/:board_id
// @access Protected
exports.deleteColumn = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { board_id, column_id } = req.params;
  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(401)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(403)
   return res.send("Hey!😁, you are not authorized")
  }
  await deleteBoardColumn(board_id, column_id);
  res.status(200)
  res.json({ success: true })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route POST /kaban/task/:board_id/:column_id
// @access Protected
exports.createTask = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name, description, index } = req.body;
  const { board_id, column_id } = req.params;

  if (index && typeof index != 'number') {
   res.status(401)
   return res.send("Index value not supported")
  }

  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(403)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(403)
   return res.send("Hey!😁, you are not authorized")
  }
  let column = await Column.findOne({ _id: column_id });
  if (!column) {
   res.status(403)
   return res.send("Task's Column does not exist")
  }
  let task = await createColumnTask({ name, description, index }, column_id);
  console.log("task", task);
  res.status(200)
  res.json({ success: true, task })
 } catch (error) {

  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});

// @route PUT /kaban/task/:board_id/:column_id/:task_id
// @access Protected
exports.updateTask = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { name, description, targetColumnId, index } = req.body;
  const { board_id, column_id: current_column_id, task_id } = req.params;

  if (targetColumnId && !(index >= 0)) {
   res.status(401)
   return res.send("Index must be specified in order to use a diffent ColumnId")
  }
  if (index && typeof index != 'number') {
   res.status(401)
   return res.send("Index value not supported")
  }

  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(403)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(403)
   return res.send("Hey!😁, you are not authorized")
  }
  let column = await Column.findOne({ _id: current_column_id });
  if (!column) {
   res.status(403)
   return res.send("Task's Column does not exist")
  }
  let taskIdFound = column.tasks.find(taskId => taskId == task_id);
  if (column && !taskIdFound) {
   res.status(403)
   return res.send("Task is not associated with the provided columnId")
  }

  let task = await updateColumnTask({ name, description, targetColumnId, index }, current_column_id, task_id);
  res.status(200)
  res.json({ success: true, task })
 } catch (error) {
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});


// @route PUT /kaban/task/:board_id/:column_id/:task_id
// @access Protected
exports.deleteTask = asyncHandler(async (req, res,) => {
 try {
  const userId = req.user.id;
  const { board_id, column_id, task_id } = req.params;

  let board = await Board.findOne({ _id: board_id });
  if (!board) {
   res.status(403)
   return res.send("Column's Board does not exist")
  }
  if (board.userId != userId) {
   res.status(403)
   return res.send("Hey!😁, you are not authorized")
  }
  let column = await Column.findOne({ _id: column_id });
  if (!column) {
   res.status(403)
   return res.send("Task's Column does not exist")
  }
  let taskIdFound = column.tasks.find(taskId => taskId == task_id);
  if (column && !taskIdFound) {
   res.status(403)
   return res.send("Task is not associated with the provided columnId")
  }

  let task = await deleteColumnTask(column_id, task_id);
  res.status(200)
  res.json({ success: true, task })
 } catch (error) {
  console.log(error)
  res.status(501)
  throw new Error("Error Processing your request at this time")
 }
});