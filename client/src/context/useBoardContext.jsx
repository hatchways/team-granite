import { useState, createContext, useContext, useEffect } from 'react';
import dndStyles from '../components/DragAndDrop/assets/dndStyles';
import {AddCard} from '../helpers/APICalls/board';
import { GetBoardData, processBoard, BoardModal} from './primitives/boardContextHelper'



const BoardContext = createContext({
  boardColumnMap: {},
  setBoardColumnMap:()=> null,
  boards: [],
  setBoards: () => null,
  boardActions: () => null,
  boardActionsInit: () => null,
});


export const BoardContextProvider = ({ children }) => {
  const classes = dndStyles();
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState({});
  const [boardColumnMap, setBoardColumnMap] = useState({});

  const initBoardAPI = { type: '', action: '', columnIndex: '', boardID: '', data: '' }
  const [boardAPIData, setBoardAPIData] = useState(initBoardAPI);

  useEffect(() => {
    (async () => {
      const boardData = await GetBoardData();
      console.log(boardData.board, boardData.result)
      return resolveResponse(boardData)
    })();
  }, [])

  //0: for BOARD :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  //1: for COLUMN :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  //2: for CARD :- [1: for ADD, 2: for UPDATE, 3: for DELETE]
  const boardActionsInit = (type, action, columnIndex, boardID) => {
    console.log(type, action, columnIndex, boardID)
    setBoardAPIData({ ...boardAPIData, type, action, columnIndex, boardID})
    boardActions(type, action, columnIndex, boardID, boardAPIData.data)
    setOpen(!open);
  };

  const handleModalClick = () => {
    setBoardAPIData(initBoardAPI)
    setOpen(!open);
  };

  const boardActions = async (type, action, columnIndex, boardID, data ) => {
    let response;
    if(type === 2){
      response = await (action === 1 && AddCard({ columnIndex, boardID, data }))
    }
    const { board } = response.success
    const boardData = await processBoard(board)
    resolveResponse(boardData)
    setOpen(false);
  };
  
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
