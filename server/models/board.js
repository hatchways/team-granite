const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: [{ type: ObjectId, ref: 'Column' }],
    userId: { type: ObjectId, ref: 'user', required: true },
  },
  {
    collection: 'boards',
    timestamps: true,
  }
)

boardSchema.statics.createBoardBoard = async function ({ name, userId }) {
  let board = new this({
    name: name,
    userId: userId,
    columns: [],
  })
  await board.save()
  return board
}

boardSchema.statics.updateBoardBoard = async function ({ name }, boardId) {
  if (name) {
    await this.findOneAndUpdate(
      { _id: boardId },
      {
        $set: {
          name: name,
        },
      }
    )
  }
  const board = await this.findOne({ _id: boardId })
  return board
}

boardSchema.statics.deleteBoardBoard = async function (boardId) {
  const board = await this.findOne({ _id: boardId })
  await board?.columns.forEach((columnObjectId) => {
    this.model('Column').deleteMany({ _Id: columnObjectId })
    this.model('Card').deleteMany({ columnId: columnObjectId })
  })
  await Board.deleteMany({ _id: boardId })
}

boardSchema.statics.generateBoard = async function (userId) {
  let boards = await this.find({ userId: userId })
    .populate({ path: 'columns', populate: { path: 'cards' } })
    .populate('userId', 'username  email register_date')
    .lean()

  if (boards.length == 0) {
    let newBoard = await new this({
      userId: userId,
      name: 'my board',
    })
    let columns = await this.model('Column').generateBoardColumns(newBoard._id)
    newBoard.columns = columns
    await newBoard.save()

    boards = await Board.find({ userId: userId })
      .populate({ path: 'columns', populate: { path: 'cards' } })
      .populate('userId', 'username email register_date')
      .lean()
  }
  return boards
}

boardSchema.statics.updateBoardColumnsList = async function (
  boardId,
  columnId,
  index
) {
  await this.findOneAndUpdate(
    { _id: boardId, columns: columnId },
    {
      $pullAll: { columns: [columnId] },
    }
  )

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
  )
}

let Board = mongoose.model('Board', boardSchema)

module.exports = Board
