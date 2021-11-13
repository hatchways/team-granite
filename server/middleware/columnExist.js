const Column = require("../models/column");

exports.columnExist = async (req, res, next) => {
  const { columnId: currentColumnId } = req.params;
  const column = await Column.findOne({ _id: currentColumnId });
  if (!column) {
    return res
      .status(403)
      .json({ success: false, message: "Card's Column does not exist" });
  }
  next();
};
