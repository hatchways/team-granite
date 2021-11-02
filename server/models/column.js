const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const columnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cards: [{ type: ObjectId, ref: 'Card' }],
    boardId: { type: ObjectId, ref: 'Board', required: true },
  },
  {
    collection: 'columns',
    timestamps: true,
  }
)

columnSchema.statics.generateBoardColumns = async function (boardId) {
  const columns = await this.find({ boardId: boardId })
  let columnsObjectIds = []

  if (columns.length == 0) {
    let defaultColumnNames = ['In Progress', 'Completed']
    defaultColumnNames.forEach((name) => {
      let newColumn = new this.model('Column')({
        boardId,
        name: name,
        cards: [],
      })
      newColumn.save()
      columnsObjectIds.push(newColumn._id)
    })
  } else {
    columns.forEach((column) => {
      columnsObjectIds.push(column._id)
    })
  }
  return columnsObjectIds
}

columnSchema.statics.createBoardColumn = async function (
  { name, index },
  boardId
) {
  // create the column
  let column = await new this({
    name: name,
    boardId: boardId,
    cards: [],
  })
  await column.save()
  index = index == 0 ? 0 : null
  // update the user board
  await this.model('Board').updateBoardColumnsList(boardId, column._id, index)
  return column
}

columnSchema.statics.updateBoardColumn = async function (
  { name, index },
  boardId,
  columnId
) {
  if (name) {
    await this.findOneAndUpdate(
      { _id: columnId },
      {
        $set: {
          name: name,
        },
      }
    )
  }
  if (index >= 0) {
    // update the user board
    await this.model('Board').updateBoardColumnsList(boardId, columnId, index)
  }
  let column = await this.findOne({ _id: columnId })
  return column
}

columnSchema.statics.deleteBoardColumn = async function (boardId, columnId) {
  await this.model('Board').findOneAndUpdate(
    { _id: boardId },
    {
      $pullAll: { columns: [columnId] },
    }
  )
  await this.deleteMany({ _Id: columnId })
  await this.model('Card').deleteMany({ columnId: columnId })
}

columnSchema.statics.updateColumnCardsList = async function (
  { cardId, index },
  columnId
) {
  //  pop the cardId if it exist
  await this.findOneAndUpdate(
    { _id: columnId },
    {
      $pullAll: { cards: [cardId] },
    }
  )

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
  )
}

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
  )

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
  )

  // update the card with its new targetId
  await this.model('Card').findOneAndUpdate(
    { _id: cardId },
    {
      $set: {
        columnId: targetColumnId,
      },
    }
  )
}

module.exports = Column = mongoose.model('Column', columnSchema)
