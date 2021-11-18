const Board = require("../models/Board");
const Column = require("../models/Column");
const Card = require("../models/Card");
// @route GET /kaban/homeBoard
// @access Protected
exports.homeBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const boards = await Board.generateBoard(userId);
    res.status(200).json({ success: true, boards });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

// @route GET /kaban/demoBoard
// @access Protected
exports.demoBoard = async (req, res) => {
  const [board] = await Board.find({ name: "Hatchway Demo" });
  res.status(200).json({
    success: {
      board,
    },
  });
};

exports.createBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const board = await Board.createBoardBoard({ name, userId });
    res.status(200).json({ success: true, board });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const { boardId } = req.params;
    const updatedBoard = await Board.updateBoardBoard({ name }, boardId);
    res.status(200).json({ success: true, board: updatedBoard });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    await Board.deleteBoardBoard(boardId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.createColumn = async (req, res) => {
  try {
    const { name } = req.body;
    let { index } = req.body;
    const { boardId } = req.params;

    if (index === 0) {
      index = 0;
    } else if (index == 1 || index == null) {
      index = null;
    } else {
      return res.status(403).json({
        succes: false,
        message: "only index 0 and 1 is allowed during Column creation",
      });
    }
    index = typeof index === "number" && index == 0 ? 0 : null;
    const column = await Column.createBoardColumn({ name, index }, boardId);

    res.status(200).json({ success: true, column });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.updateColumn = async (req, res) => {
  const { name, index } = req.body;
  const { boardId, columnId } = req.params;
  const column = await Column.updateColumn({ name, index }, boardId, columnId);

  res.status(200).json({ success: { column } });
};

exports.deleteColumn = async (req, res) => {
  const { boardId, columnId } = req.params;

  await Column.deleteColumn(boardId, columnId);
  res.status(200).json({ success: "Column deleted." });
};

exports.createCard = async (req, res) => {
  try {
    const { name, description } = req.body;
    let { index } = req.body;
    const { columnId } = req.params;

    if (index == 1 || index == null) {
      index = null;
    } else {
      return res.status(403).json({
        succes: false,
        message: "only index 0 and 1 is allowed during Card creation",
      });
    }
    const card = await Card.createColumnCard(
      { name, description, index },
      columnId
    );

    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { name, description, targetColumnId, index, deadline, comment } =
      req.body;
    const { columnId: currentColumnId, cardId } = req.params;

    if (targetColumnId && !index) {
      return res.status(403).json({
        success: false,
        message:
          "Index must be specified in order to move Card to a different Column",
      });
    }
    if (index && typeof index != "number") {
      return res
        .status(403)
        .json({ success: false, message: "Index value not supported" });
    }

    const card = await Card.updateColumnCard(
      {
        name,
        description,
        targetColumnId,
        index,
        deadline,
        comment,
      },
      currentColumnId,
      cardId
    );

    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { columnId, cardId } = req.params;

    const card = await Card.deleteColumnCard(columnId, cardId);
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Processing your request at this time",
    });
  }
};
