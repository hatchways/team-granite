import { Board, BoardApiData, Column, Card } from '../../interface/BoardApiData';
import { FetchOptions } from '../../interface/FetchOptions';



export const FetchBoard = async (): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/board`, fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      return result;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};


export const AddBoard = async (data: Board): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/board`, fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      console.log(result);
      return result
    }).catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export interface AddCard{
    boardID: string,
    columnIndex: string,
    data: string
}

export const AddCard = async (data: AddCard): Promise<BoardApiData> => {
  console.log('THIS IS THE TITLE ', data);
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/board/card`, fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      console.log(result);
      return result;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};


export const UpdateCard = async (data: Card): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/board`, fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      console.log(result);
      return result;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
