const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const columnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cards: [
      { type: ObjectId, ref: "card", required: true, autopopulate: true },
    ],
    boardId: { type: ObjectId, ref: "board" },
  },
  {
    collection: "columns",
    timestamps: true,
  }
);

columnSchema.plugin(require("mongoose-autopopulate"));

columnSchema.statics.createColumn = async function ({ name, index }, boardId) {
  // create the column
  let column = await new this({
    name: name,
    boardId: boardId,
    cards: [],
  });
  await column.save();
  index = index == 0 ? 0 : null;
  // update the user board
  await this.model("board").updateColumnsList(boardId, column._id, index);
  return column;
};

columnSchema.statics.updateColumn = async function (
  { name, index },
  boardId,
  columnId
) {
  console.log(name);
  if (name) {
    await this.findOneAndUpdate(
      { _id: columnId },
      {
        $set: {
          name: name,
        },
      }
    );
  }
  if (index >= 0) {
    // update the user board
    await this.model("board").updateColumns(boardId, columnId, index);
  }
  let column = await this.findOne({ _id: columnId });
  return column;
};

columnSchema.statics.deleteColumn = async function (boardId, columnId) {
  await this.model("board").findOneAndUpdate(
    { _id: boardId },
    {
      $pullAll: { columns: [columnId] },
    }
  );
  await this.deleteMany({ _Id: columnId });
  await this.model("card").deleteMany({ columnId: columnId });
};

columnSchema.statics.updateCardsList = async function (
  { cardId, index },
  columnId
) {
  //  pop the cardId if it exist
  await this.findOneAndUpdate(
    { _id: columnId },
    {
      $pullAll: { cards: [cardId] },
    }
  );

  // update the Column with new cardId
  await this.findOneAndUpdate(
    { _id: columnId },
    {
      $push: {
        cards: {
          $each: [cardId],
          $position: index,
        },
      },
    }
  );
};

columnSchema.statics.updateTargetColumnCardsList = async function (
  { cardId, index },
  currentColumnId,
  targetColumnId
) {
  //  pop the cardId if it exist
  await this.findOneAndUpdate(
    { _id: currentColumnId },
    {
      $pullAll: { cards: [cardId], cardsSort: [cardId] },
    }
  );

  // update the Column with new cardId
  await this.findOneAndUpdate(
    { _id: targetColumnId },
    {
      $push: {
        cards: {
          $each: [cardId],
          $position: index,
        },
        cardsSort: {
          $each: [cardId],
          $position: index,
        },
      },
    }
  );

  // update the card with its new targetId
  await this.model("card").findOneAndUpdate(
    { _id: cardId },
    {
      $set: {
        columnId: targetColumnId,
      },
    }
  );
};

module.exports = Column = mongoose.model("column", columnSchema);
