
export interface Board {
    id: string | number;
    name: string;
    columns: Column[];
    createdAt: string;
    updatedAt: string;
}

export interface Column {
  index: number;
  name: string;
  tasks: Card[];
}

export interface Content {
  name: string;
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
  success?: Board[];
}