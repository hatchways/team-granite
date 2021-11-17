import { Column, BoardApiData, Card } from '../../interface/BoardApiData';
import { FetchOptions } from '../../interface/FetchOptions';

export interface AddCard {
  boardID: string;
  columnIndex: string;
  data: string;
}

export const FetchBoard = async (): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch('/board', fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      return result;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const AddBoard = async (data: Column[]): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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

export const UpdateBoard = async (id: string, data: Column[]): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, data }),
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

export const AddCard = async (data: AddCard): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/board/column/card`, fetchOptions)
    .then(async (res) => {
      const result = await res.json();
      return result;
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const UpdateCard = async (data: Card): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
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

export const DeleteCard = async (id: string): Promise<BoardApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: id,
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
