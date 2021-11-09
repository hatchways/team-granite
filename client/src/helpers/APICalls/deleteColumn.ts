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

const deleteColumn = async (boardId: string, columnId: string): Promise<ColumnApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
  };
  return await fetch(`/kanban/board/column/${boardId}/${columnId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default deleteColumn;
