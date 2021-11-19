export interface Column {
  id: string;
  _id: string;
  name: string;
  cards: Card[];
  boardId: string;
}

export interface Card {
  id: string;
  _id: string;
  name: string;
  description: string;
  deadline: string;
  columnId: string;
  color: string;
}

export interface Board {
  id: string;
  _id: string;
  name: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}
