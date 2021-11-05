import { Board, Column, Card } from '../interface/BoardApiData';

export const mockColumns: any = {
  'col-0': {
    id: 'col-0',
    title: 'Incoming',
    cardIds: ['card-1', 'card-5'],
  },
  'col-1': {
    id: 'col-1',
    title: 'Backlog',
    cardIds: ['card-2'],
  },
  'col-2': {
    id: 'col-2',
    title: 'In progess',
    cardIds: ['card-3'],
  },
  'col-3': {
    id: 'col-3',
    title: 'Completed',
    cardIds: ['card-4'],
  },
};

export const mockCards: any = {
  'card-1': {
    id: 'card-1',
    title: 'Card title 1',
    description: 'Card description 1',
    deadline: new Date().toLocaleString(),
    columnKey: 'col-0',
    color: 'green',
  },
  'card-2': {
    id: 'card-2',
    title: 'Card title 2',
    description: 'Card description 2',
    deadline: new Date().toLocaleString(),
    columnKey: 'col-1',
    color: 'red',
  },
  'card-3': {
    id: 'card-3',
    title: 'Card title 3',
    description: 'Card description 3',
    deadline: new Date().toLocaleString(),
    columnKey: 'col-2',
    color: 'yellow',
  },
  'card-4': {
    id: 'card-4',
    title: 'Card title 4',
    description: 'Card description 4',
    deadline: new Date().toLocaleString(),
    columnKey: 'col-3',
    color: 'blue',
  },
  'card-5': {
    id: 'card-5',
    title: 'Card title 5',
    description: 'Card description 5',
    deadline: new Date().toLocaleString(),
    columnKey: 'col-0',
    color: 'purple',
  },
};

export const mockBoard: any = {
  id: '1',
  title: 'Hatchway product',
  columnIds: ['col-0', 'col-1', 'col-2', 'col-3'],
  createdAt: new Date().toLocaleString(),
  updatedAt: new Date().toLocaleString(),
};
