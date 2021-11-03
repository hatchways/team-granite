import { Board, BoardApiData } from '../../interface/BoardApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const login = async (data: Board): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/board`, fetchOptions)
    .then((res) => {
      console.log(res);
      res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default login;
