const cardJson = require("./card.json");
const columnJson = require("./column.json");
const boardJson = require("./board.json");

const Board = require("../models/Board");
const Card = require("../models/Card");
const Column = require("../models/Column");

exports.checkBoardData = async () => {
  if (!(await Board.exists({ name: "Hatchway Demo" }))) {
    const columns = await Promise.all(
      boardJson.columns.map(async (columnId) => {
        const column = columnJson.columns.find(
          (column) => column.id == columnId
        );

        const cards = await Promise.all(
          column.cards.map(async (cardId) => {
            let card = cardJson.cards.find((card) => card.id == cardId);
            return await Card.create({
              name: card.name,
              description: card.description,
              color: card.color,
              deadline: Date.now(),
              comment: "GenericComment",
            });
          })
        );

        const newColumn = await Column.create({
          name: column.name,
          cards: cards,
        });
        cards.map(async (card) => {
          card.columnId = newColumn.id;
          await card.save();
        });

        return newColumn;
      })
    );

    const board = await Board.create({
      name: boardJson.name,
      columns: columns,
    });

    board.columns.map(async (column) => {
      column.boardId = board.id;
      await column.save();
    });
  }
};
