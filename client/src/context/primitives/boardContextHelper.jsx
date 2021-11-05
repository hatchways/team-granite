import { FetchBoard, AddCard } from '../../helpers/APICalls/board';


export const resolveBoard = (boardColumns, columnItems) => {
    return boardColumns.sort((colA, colB) => colA.index - colB.index).reduce(
        (previous, columnKey) => ({
            ...previous,
            [columnKey.title]: [...columnItems.filter((item) => item.columnKey === columnKey)],
        }), {});
}

export const processBoard = async (boards) => {
    console.log(boards)
    const board = boards[0];
    const boardColumns = board.columns;
    const columnItems = [];
    boardColumns.forEach((column) => columnItems.push(...column.cards));
    columnItems.forEach((column_1) => column_1.columnKey = boardColumns.find((col) => col.index == column_1.columnKey));
    const result = await resolveBoard(boardColumns, columnItems)

    return { boards, board, result }
}


export const GetBoardData = async () => {
    const data = await FetchBoard();
    if (data.error) {
        return (data.error.message);
    } else if (data.success) {

        const { boards, board, result } = await processBoard(data.success.board);

        return { boards, board, result };

    } else {
        console.error({ data });
    }
};