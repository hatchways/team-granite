import { FetchOptions } from '../../interface/FetchOptions';
import { Column } from '../../mocks/mockBoardData';

interface ColumnApiData {
  success?: {
    column: Column;
  };
  error?: {
    message: string;
  };
}

const updateBoard = async (
  updateBody: { name: string; index: number },
  boardId: string,
  columnId: string,
): Promise<ColumnApiData> => {
  console.log(updateBody);
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateBody),
  };
  return await fetch(`/kanban/board/column/${boardId}/${columnId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateBoard;
