const Board = require("../models/Board");

exports.userCanEditBoard = async (req, res, next) => {
  const userId = req.user.id;
  const { boardId } = req.params;
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    return res
      .status(401)
      .json({ success: false, message: "Column's Board does not exist" });
  }
  if (board.userId != userId) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  }
  next();
};
