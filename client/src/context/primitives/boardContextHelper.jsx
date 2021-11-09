import { FetchBoard, UpdateBoard } from '../../helpers/APICalls/board';

export const resolveBoard = (boardColumns, columnItems) => {
  return boardColumns
    .sort((colA, colB) => colA.index - colB.index)
    .reduce(
      (previous, columnId) => ({
        ...previous,
        [columnId.name]: [...columnItems.filter((item) => item.columnId === columnId)],
      }),
      {},
    );
};

export const processBoard = async (boards, id) => {
  const board = id ? boards.find((boardItem) => boardItem.id === id) : boards[0];
  const boardColumns = board.columns;
  const columnItems = [];
  boardColumns.forEach((column) => columnItems.push(...column.tasks));
  columnItems.forEach((column) => (column.columnId = boardColumns.find((col) => col.index === column.columnId)));
  const result = await resolveBoard(boardColumns, columnItems);
  return { boards, board, result };
};

export const GetBoardData = async (id) => {
  const data = await FetchBoard(id);
  if (data.error) {
    return data.error.message;
  } else if (data.success) {
    const { boards, board, result } = await processBoard(data.success.board, id);
    return { boards, board, result };
  } else {
    console.error({ data });
  }
};

export const GetBoardUpdate = async (id, boardData) => {
  const data = await UpdateBoard(id, boardData);
  if (data.error) {
    return data.error.message;
  } else if (data.success) {
    return;
  } else {
    console.error({ data });
  }
};
