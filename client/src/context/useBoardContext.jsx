import { useState, createContext, useContext } from 'react';
import { mockColumns, mockCards, mockBoard } from '../mocks/mockBoardData';

//interface
//columns Column[]
//cards Card[]
//board Board

const mockBoardData = {
  columns: mockColumns,
  cards: mockCards,
  board: mockBoard,
};

const BoardContext = createContext({
  boardData: {},
  setBoardData: () => null,
});

export const BoardContextProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(mockBoardData);
  const value = { boardData, setBoardData };
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoardContext = () => useContext(BoardContext);
