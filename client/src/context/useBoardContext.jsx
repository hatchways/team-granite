import { useState, createContext, useContext } from 'react';
import { boardColumns, columnItems } from '../components/DragAndDrop/data';

const BoardColumnMap = boardColumns.sort((colA, colB) => colA.index-colB.index).reduce(
  (previous, columnKey) => ({
    ...previous,
    [columnKey.title]: [...columnItems.filter((item) => item.columnKey === columnKey)],
  }), {});


const BoardContext = createContext({
  boardColumnMap: {},
  setBoardColumnMap:()=> null,
  columnRawData: [],
  updateColumnRawContext: () => undefined
});


export const BoardContextProvider = ({ children }) => {
  const [columnRawData, setColumnRawData] = useState(boardColumns.sort((colA, colB) => colA.index - colB.index));
  const updateColumnRawContext = data => {
    setColumnRawData(data)
  }

  //ORGANIZE DATA
  const [boardColumnMap, setBoardColumnMap] = useState(BoardColumnMap);

  const value = { columnRawData, updateColumnRawContext, boardColumnMap, setBoardColumnMap}
  return <BoardContext.Provider value={value}>
    {children}
  </BoardContext.Provider>;
};

export function useBoardContext() {
  return useContext(BoardContext);
}
