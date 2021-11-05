import { useState, createContext, useContext, useEffect, useRef } from 'react';
import {
  Button, TextField, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, Box
} from '@material-ui/core';
import dndStyles from '../components/DragAndDrop/assets/dndStyles';
import {FetchBoard, AddCard} from '../helpers/APICalls/board';
import { GetBoardData, processBoard} from './primitives/boardContextHelper'






const BoardContext = createContext({
  boardColumnMap: {},
  setBoardColumnMap:()=> null,
  boards: [],
  setBoards: () => null,
  boardActions: () => null,
  boardActionsInit: () => null,
});

export const BoardModal = ({ classes, open, handleModalClick, boardActions, setBoardAPIData}) => {

  const inputElement = useRef(null)

return<Dialog open={open} className={classes.modalDialog} maxWidth={'sm'} onClose={()=>handleModalClick()}>
    <Button className={classes.close} onClick={()=>handleModalClick()} >X</Button>

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
        onChange={() => setBoardAPIData(prev=>{
          return {...prev, data: inputElement.current.value}
        })}
        inputRef={inputElement}
      />

    </DialogContent>
    <Box>
      <Button onClick={()=>boardActions()}>Create</Button>
    </Box>
  </Dialog>
}

export const BoardContextProvider = ({ children }) => {
  const classes = dndStyles();
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState({});
  const [boardColumnMap, setBoardColumnMap] = useState({});

  const initBoardAPI = { type: '', action: '', columnIndex: '', boardID: '', data: '' }
  const [boardAPIData, setBoardAPIData] = useState(initBoardAPI);

  const handleModalClick = () => {
    setBoardAPIData(initBoardAPI)
    setOpen(!open);
  };

  //0: for BOARD :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  //1: for COLUMN :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  //2: for CARD :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  const boardActionsInit = (type, action, columnIndex, boardID) => {
    console.log(type, action, columnIndex, boardID)
    setBoardAPIData({ ...boardAPIData, type, action, columnIndex, boardID})
    setOpen(!open);
  };

  const boardActions = async () => {
    console.log(boardAPIData);
    const { type, action, columnIndex, boardID, data} = boardAPIData;
    
    if(type === 2){
      const response = await (action === 1 && AddCard({ columnIndex, boardID, data }))
    }

    const { board } = response.success
    const boardData = await processBoard(board)
    resolveResponse(boardData)
    setOpen(!open);
  };
  
    useEffect(()=>{
      (async()=>{
        const boardData = await GetBoardData();
        console.log(boardData.board, boardData.result)
        return resolveResponse(boardData)
      })();
    }, [])

  const resolveResponse = (data) => {
    const { boards, board, result } = data;
    setBoardColumnMap(result);
    setBoards(boards);
    setBoard(board);
  }
    

  const value = { board, boardColumnMap, setBoardColumnMap, boardActions, boardActionsInit }

  return  <BoardContext.Provider value={value}>
    <BoardModal classes={classes} open={open} handleModalClick={handleModalClick}
      boardActions={boardActions} setBoardAPIData={setBoardAPIData}
     />
    {boards.length > 0 && children}
  </BoardContext.Provider>;
};

export const useBoardContext = () => useContext(BoardContext);
