const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    columnId: { type: ObjectId, ref: "column" },
    color: { type: String },
    deadline: { Type: Date },
    comment: { type: String },
  },
  {
    collection: "cards",
    timestamps: true,
  }
);

cardSchema.statics.createCard = async function (
  { name, description, index },
  columnId
) {
  // create the column
  let card = await new this({
    name: name,
    description: description || "",
    columnId: columnId,
  });
  await card.save();
  // update the Column Card List board
  await this.model("column").updateCardsList(
    { cardId: card._id, index },
    columnId
  );

  return card;
};

cardSchema.statics.updateCard = async function (
  { name, description, targetColumnId, index, deadline, comment },
  currentColumnId,
  cardId
) {
  let previousCardData = await this.findOne({ _id: cardId });

  await this.findOneAndUpdate(
    { _id: cardId },
    {
      $set: {
        name: name || previousCardData.name,
        description: description || previousCardData.description,
        deadline: deadline || previousCardData.deadline,
        comment: comment || previousCardData.comment,
        description: description || previousCardData.description,
      },
    }
  );

  if (index >= 0) {
    // update the user board
    if (targetColumnId) {
      await this.model("column").updateTargetColumnCardsList(
        { cardId, index },
        currentColumnId,
        targetColumnId
      );
    } else {
      await this.model("column").updateColumnCardsList(
        { cardId, index },
        currentColumnId
      );
    }
  }
  let card = await this.findOne({ _id: cardId });
  return card;
};

cardSchema.statics.deleteCard = async function (columnId, cardId) {
  await this.model("column").findOneAndUpdate(
    { _id: columnId },
    {
      $pullAll: { cards: [cardId] },
    }
  );
  await this.deleteMany({ _id: cardId, columnId: columnId });
};

module.exports = Card = mongoose.model("card", cardSchema);
