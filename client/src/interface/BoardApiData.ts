export interface Board {
  id: string | number;
  title: string;
  columnIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Card {
  id: string;
  title: string;
  deadline: string;
  description: string;
  columnKey: number | unknown;
}
