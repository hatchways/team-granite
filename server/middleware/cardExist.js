const Column = require("../models/column");

exports.cardExist = async (req, res, next) => {
  const { columnId, cardId } = req.params;
  const column = await Column.findOne({ _id: columnId });
  const cardIdFound = column.cards.find(
    (currentCardId) => currentCardId == cardId
  );
  if (column && !cardIdFound) {
    return res.status(403).json({
      success: false,
      message: "Card is not associated with the provided columnId",
    });
  }
  next();
};
