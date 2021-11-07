import { useRef } from 'react'
import {
    Button, TextField, Dialog, DialogContent,
    DialogTitle, Box
} from '@material-ui/core';
import { FetchBoard } from '../../helpers/APICalls/board';


export const resolveBoard = (boardColumns, columnItems) => {
    return boardColumns.sort((colA, colB) => colA.index - colB.index).reduce(
        (previous, columnId) => ({
            ...previous,
            [columnId.name]: [...columnItems.filter((item) => item.columnId === columnId)],
        }), {});
}

export const processBoard = async (boards, id) => {
    const board = id ? boards.find(x => x.id == id) : boards[0];
    const boardColumns = board.columns;
    const columnItems = [];
    boardColumns.forEach((column) => columnItems.push(...column.tasks));
    columnItems.forEach((column_1) => column_1.columnId = boardColumns.find((col) => col.index == column_1.columnId));
    const result = await resolveBoard(boardColumns, columnItems)

    return { boards, board, result }
}


export const GetBoardData = async (id) => {
    const data = await FetchBoard(id);
    if (data.error) {
        return (data.error.message);
    } else if (data.success) {
        const { boards, board, result } = await processBoard(data.success.board, id);
        return { boards, board, result };
    } else {
        console.error({ data });
    }
};


export const BoardModal = ({ classes, open, handleModalClick, boardActions, setBoardAPIData }) => {

    const inputElement = useRef(null)

    return <Dialog open={open} className={classes.modalDialog} maxWidth={'sm'} onClose={() => handleModalClick()}>
        <Button className={classes.close} onClick={() => handleModalClick()} >X</Button>

        <DialogTitle className={classes.title}>Create new Board</DialogTitle>
        <DialogContent>

            <TextField
                autoFocus
                margin="dense"
                id="outlined-size-normal"
                label="Add Title"
                type="text"
                fullWidth
                variant="outlined"
                onChange={() => setBoardAPIData(prev => {
                    return { ...prev, data: inputElement.current.value }
                })}
                inputRef={inputElement}
            />

        </DialogContent>
        <Box>
            <Button onClick={() => boardActions()}>Create</Button>
        </Box>
    </Dialog>
}