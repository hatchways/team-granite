import { useState, createContext, useContext } from 'react';
import { boardColumns, columnItems } from '../mocks/mockBoardData';

const BoardColumnMap = boardColumns.sort((colA, colB) => colA.index-colB.index).reduce(
  (previous, columnKey) => ({
    ...previous,
    [columnKey.title]: [...columnItems.filter((item) => item.columnKey === columnKey)],
  }), {});

const BoardContext = createContext({
  boardColumnMap: {},
  setBoardColumnMap:()=> null,
});

export const BoardContextProvider = ({ children }) => {
  const [boardColumnMap, setBoardColumnMap] = useState(BoardColumnMap);
  const value = { boardColumnMap, setBoardColumnMap}
  return <BoardContext.Provider value={value}>
    {children}
  </BoardContext.Provider>;
};

export const useBoardContext = () => useContext(BoardContext);
