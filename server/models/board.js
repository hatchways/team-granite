const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: [
      { type: ObjectId, ref: "column", required: true, autopopulate: true },
    ],
    userId: { type: ObjectId, ref: "user" },
  },
  {
    collection: "boards",
    timestamps: true,
  }
);

boardSchema.plugin(require("mongoose-autopopulate"));

boardSchema.statics.createBoard = async function ({ name, userId }) {
  let board = new this({
    name: name,
    userId: userId,
    columns: [],
  });
  await board.save();
  return board;
};

boardSchema.statics.updateBoard = async function ({ name }, boardId) {
  if (name) {
    await this.findOneAndUpdate(
      { _id: boardId },
      {
        $set: {
          name: name,
        },
      }
    );
  }
  const board = await this.findOne({ _id: boardId });
  return board;
};

boardSchema.statics.deleteBoard = async function (boardId) {
  const board = await this.findOne({ _id: boardId });
  await board?.columns.forEach((columnObjectId) => {
    this.model("column").deleteMany({ _id: columnObjectId });
    this.model("card").deleteMany({ columnId: columnObjectId });
  });
  await Board.deleteMany({ _id: boardId });
};

boardSchema.statics.updateColumns = async function (boardId, columnId, index) {
  //  pop the columnId if it exist
  await this.findOneAndUpdate(
    { _id: boardId, columns: columnId },
    {
      $pullAll: { columns: [columnId] },
    }
  );

  await this.findOneAndUpdate(
    { _id: boardId },
    {
      $push: {
        columns: {
          $each: [columnId],
          $position: index,
        },
      },
    }
  );
};

module.exports = Board = mongoose.model("board", boardSchema);
