import { FetchOptions } from '../../interface/FetchOptions';
import { Board } from '../../mocks/mockBoardData';

interface BoardApiData {
  success?: {
    board: Board;
  };
  error?: {
    message: string;
  };
}

const loadBoard = async (): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/kanban/board/demo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default loadBoard;
