
export interface Board {
    id: string | number;
    title: string;
    columns: Column[];
    createdAt: string;
    updatedAt: string;
}

export interface Column {
  index: number;
  title: string;
  cards: Card[];
}

export interface Content {
  title: string;
  deadline: string;
  description: string;
  tag: number;
}

export interface Card {
  id: string | number;
  content: Content;
  columnKey: number | unknown;
}


export interface BoardApiData {
  error?: { message: string };
  success?: Board;
}