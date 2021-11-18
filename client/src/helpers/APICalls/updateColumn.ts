import { FetchOptions } from '../../interface/FetchOptions';
import { Column } from '../../interface/Board';

interface ColumnApiData {
  success?: {
    column: Column;
  };
  error?: {
    message: string;
  };
}

interface UpdateBody {
  name: string;
  index: number;
}

const updateColumn = async (updateBody: UpdateBody, boardId: string, columnId: string): Promise<ColumnApiData> => {
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

export default updateColumn;
