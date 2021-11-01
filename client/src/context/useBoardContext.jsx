import { useState, createContext, useContext, useEffect } from 'react';
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
  //ORGANIZE DATA
  const [boardColumnMap, setBoardColumnMap] = useState(BoardColumnMap);

  const value = { boardColumnMap, setBoardColumnMap}
  
  // TO OBTAIN THE TRANSFORMED RAW DATA
  useEffect(()=>{
    const transformed = Object.values(boardColumnMap)
    transformed.forEach((trans)=>{
      if(trans.length < 1) return;
      trans.map((trans2)=>{
        if(!trans2.columnKey || !trans2.columnKey.index) return;
        console.log(trans2, trans2.columnKey.index);
        var newColKey = trans2.columnKey.index;
        trans2.columnKey = newColKey;
      })
    })
    console.log(transformed)
  }, [boardColumnMap])
  
  return <BoardContext.Provider value={value}>
    {children}
  </BoardContext.Provider>;
};

export const useBoardContext = () => useContext(BoardContext);
