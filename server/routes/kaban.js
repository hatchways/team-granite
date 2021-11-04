const express = require("express");
const { homeBoard, createColumn, updateColumn, deleteColumn, createBoard, deleteBoard, updateBoard, createTask, updateTask, deleteTask } = require("../controllers/kaban");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateColumn, validateBoardData, validateTaskData } = require("../validate");


router.route("/").get(protect, homeBoard);
router.route("/board").post(protect, validateBoardData, createBoard);
router.route("/board/:board_id").put(protect, updateBoard);
router.route("/board/:board_id").delete(protect, deleteBoard);
router.route("/column/:board_id/").post(protect, validateColumn, createColumn);
router.route("/column/:board_id/:column_id").put(protect, updateColumn);
router.route("/column/:board_id/:column_id").delete(protect, deleteColumn);
router.route("/task/:board_id/:column_id").post(protect, validateTaskData, createTask);
router.route("/task/:board_id/:column_id/:task_id").put(protect, validateTaskData, updateTask);
router.route("/task/:board_id/:column_id/:task_id").delete(protect, deleteTask);

module.exports = router;