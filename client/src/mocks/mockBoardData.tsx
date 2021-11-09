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

export const mockCards: { [key: string]: Card } = {
  'card-1': {
    id: 'card-1',
    _id: 'card-1',
    name: 'Card name 1',
    description: 'Card description 1',
    deadline: new Date().toLocaleString(),
    columnId: 'col-0',
    color: 'green',
  },
  'card-2': {
    id: 'card-2',
    _id: 'card-2',
    name: 'Card name 2',
    description: 'Card description 2',
    deadline: new Date().toLocaleString(),
    columnId: 'col-1',
    color: 'red',
  },
  'card-3': {
    id: 'card-3',
    _id: 'card-3',
    name: 'Card name 3',
    description: 'Card description 3',
    deadline: new Date().toLocaleString(),
    columnId: 'col-2',
    color: 'yellow',
  },
  'card-4': {
    id: 'card-4',
    _id: 'card-4',
    name: 'Card name 4',
    description: 'Card description 4',
    deadline: new Date().toLocaleString(),
    columnId: 'col-3',
    color: 'blue',
  },
  'card-5': {
    id: 'card-5',
    _id: 'card-5',
    name: 'Card name 5',
    description: 'Card description 5',
    deadline: new Date().toLocaleString(),
    columnId: 'col-0',
    color: 'purple',
  },
};

export const mockColumns: { [key: string]: Column } = {
  'col-0': {
    id: 'col-0',
    _id: 'col-0',
    name: 'Incoming',
    cards: [mockCards['card-1'], mockCards['card-5']],
    boardId: '1',
  },
  'col-1': {
    id: 'col-1',
    _id: 'col-1',
    name: 'Backlog',
    cards: [mockCards['card-2']],
    boardId: '1',
  },
  'col-2': {
    id: 'col-2',
    _id: 'col-2',
    name: 'In progess',
    cards: [mockCards['card-3']],
    boardId: '1',
  },
  'col-3': {
    id: 'col-3',
    _id: 'col-3',
    name: 'Completed',
    cards: [mockCards['card-4']],
    boardId: '1',
  },
};

export const mockBoard: Board = {
  id: '1',
  _id: '1',
  name: 'Hatchway product',
  columns: [mockColumns['col-0'], mockColumns['col-1'], mockColumns['col-2'], mockColumns['col-3']],
  createdAt: new Date().toLocaleString(),
  updatedAt: new Date().toLocaleString(),
};
