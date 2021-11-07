const express = require("express");
const controler = require("../controllers/kanban");
const router = express.Router();
const protect = require("../middleware/auth");
const { userCanEditBoard } = require("../middleware/userCanEditBoard");
const {
  validateColumn,
  validateBoardData,
  validateCardData,
} = require("../validate");
const { columnExist } = require("../middleware/columnExist");
const { cardExist } = require("../middleware/cardExist");

router.route("/").get(protect, controler.homeBoard);
router.route("/board").post(protect, validateBoardData, controler.createBoard);
router
  .route("/board/:boardId")
  .put(protect, userCanEditBoard, controler.updateBoard);
router
  .route("/board/:boardId")
  .delete(protect, userCanEditBoard, controler.deleteBoard);
router
  .route("/board/column/:boardId/")
  .post(protect, userCanEditBoard, validateColumn, controler.createColumn);
router
  .route("/board/column/:boardId/:columnId")
  .put(protect, userCanEditBoard, controler.updateColumn);
router
  .route("/board/column/:boardId/:columnId")
  .delete(protect, userCanEditBoard, controler.deleteColumn);
router
  .route("/board/column/card/:boardId/:columnId")
  .post(
    protect,
    validateCardData,
    userCanEditBoard,
    columnExist,
    controler.createCard
  );
router
  .route("/board/column/card/:boardId/:columnId/:cardId")
  .put(protect, userCanEditBoard, columnExist, cardExist, controler.updateCard);
router
  .route("/board/column/card/:boardId/:columnId/:cardId")
  .delete(
    protect,
    userCanEditBoard,
    columnExist,
    cardExist,
    controler.deleteCard
  );

module.exports = router;
