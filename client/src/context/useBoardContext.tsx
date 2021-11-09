import { useState, createContext, useContext } from 'react';
import { Board } from '../mocks/mockBoardData';

interface IBoardContext {
  boardData: Board | null;
  updateBoardData: (boardData: Board) => void;
}

const BoardContext = createContext<IBoardContext>({
  boardData: null,
  updateBoardData: () => null,
});

export const BoardContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [boardData, setBoardData] = useState<Board | null>(null);

  const updateBoardData = (boardData: Board | null) => {
    setBoardData(boardData);
  };

  const value = { boardData, updateBoardData };
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};

export const useBoardContext = (): IBoardContext => useContext(BoardContext);
