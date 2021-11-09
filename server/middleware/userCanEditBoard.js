const Board = require("../models/Board");

exports.userCanEditBoard = async (req, res, next) => {
  const userId = req.user.id;
  const { boardId } = req.params;
  const board = await Board.findOne({ _id: boardId });
  //Temporary workaround, to be removed once multiple board feature is added.

  if (board.name === "Hatchway Demo") {
    console.log(board.name);
    next();
  } else if (!board) {
    return res
      .status(401)
      .json({ success: false, message: "Column's Board does not exist" });
  } else if (board.userId != userId) {
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  }
};
