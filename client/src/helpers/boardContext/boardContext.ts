import { Board, Column } from '../../interface/Board';

export function moveColumn(board: Board, sourceIndex: number, destIndex: number): Board {
  const columns = Array.from(board.columns);
  const [targetColumn] = columns.splice(sourceIndex, 1);
  columns.splice(destIndex, 0, targetColumn);
  board.columns = columns;
  return board;
}

export function moveCard(
  board: Board,
  sourceIndex: number,
  destIndex: number,
  sourceColId: string,
  destColId: string,
): Board {
  const startColumn = board.columns.find((column: Column) => column._id === sourceColId);
  const endColumn = board.columns.find((column: Column) => column._id === destColId);

  if (!startColumn || !endColumn) {
    throw new Error('Error with Beauitful Dnd, not so beautiful now.');
  }

  if (startColumn === endColumn) {
    const column = startColumn;
    const cards = Array.from(column.cards);

    const [newCard] = cards.splice(sourceIndex, 1);
    cards.splice(destIndex, 0, newCard);

    column.cards = cards;
    const colIndex = board.columns.findIndex((innerColumn: Column) => innerColumn._id === column._id);

    board.columns[colIndex] = column;
    return board;
  }

  const startCards = Array.from(startColumn.cards);
  const [Card] = startCards.splice(sourceIndex, 1);

  startColumn.cards = startCards;

  const endCards = Array.from(endColumn.cards);
  endCards.splice(destIndex, 0, Card);

  endColumn.cards = endCards;

  const startColIndex = board.columns.findIndex((innerColumn: Column) => innerColumn._id === startColumn._id);
  const endColIndex = board.columns.findIndex((innerColumn: Column) => innerColumn._id === endColumn._id);

  board.columns[startColIndex] = startColumn;
  board.columns[endColIndex] = endColumn;

  return board;
}
