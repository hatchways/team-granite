import { useState, createContext, useContext, useEffect } from 'react';
import dndStyles from '../components/DragAndDrop/assets/dndStyles';
import { GetBoardData, GetBoardUpdate } from './primitives/boardContextHelper';

const BoardContext = createContext({
  boardColumnMap: {},
  setBoardColumnMap: () => null,
  board: { id: '', name: '' },
  boards: [],
  setBoards: () => null,
  ordered: [],
  setOrdered: () => null,
});

export const BoardContextProvider = ({ children }) => {
  const classes = dndStyles();
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState({});
  const [boardColumnMap, setBoardColumnMap] = useState({});

  const [ordered, setOrdered] = useState([]);

  const initBoardAPI = { type: '', action: '', columnIndex: '', boardID: '', data: '' };
  const [boardAPIData, setBoardAPIData] = useState(initBoardAPI);

  useEffect(() => {
    (async () => {
      const boardData = await GetBoardData();
      return resolveResponse(boardData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!board.id || ordered.length === 0) return;

      const remapped = [];
      ordered.map((c, i) => remapped.push({ index: `${i}`, name: c, tasks: [] }));

      ordered.map((x, i) => {
        const init = boardColumnMap[x];
        init.forEach((n) => {
          remapped[i].tasks.push(n);
          n.columnId = `${i}`;
        });
      });

      return await GetBoardUpdate(board.id, remapped);
    })();
  }, [boardColumnMap, ordered, board]);

  const resolveResponse = async (data) => {
    if (!data) return;
    const { boards, board, result } = await data;
    setOrdered(Object.keys(result));
    setBoardColumnMap(result);
    setBoards(boards);
    setBoard(board);
  };

  const value = { board, boardColumnMap, setBoardColumnMap, ordered, setOrdered };

  return <BoardContext.Provider value={value}>{boards.length > 0 && children}</BoardContext.Provider>;
};

export const useBoardContext = () => useContext(BoardContext);
