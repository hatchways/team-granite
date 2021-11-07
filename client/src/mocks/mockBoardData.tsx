import { Board, Column, Card } from '../interface/BoardApiData';

const date = new Date().toLocaleString();

export const boardColumns: Column[] = [
  {
    index: 3,
    name: 'TODO',
    tasks: [],
  },
  {
    index: 4,
    name: 'IN_PROGRESS',
    tasks: [],
  },
  {
    index: 1,
    name: 'DONE',
    tasks: [],
  },
  {
    index: 2,
    name: 'INCOMING',
    tasks: [],
  },
];

export const columnItems: Card[] = [
  {
    id: '1',
    content: {
      name: 'Ronaldo Transfer To Man U',
      description: 'Sometimes life is scary and dark',
      deadline: date,
      tag: 1,
    },
    columnKey: boardColumns.find((column) => column.index === 2),
  },
  {
    id: '2',
    content: {
      name: 'Ronaldo Transfer To Man U',
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 2,
    },
    columnKey: boardColumns.find((column) => column.index === 1),
  },
  {
    id: '3',
    content: {
      name: "You got to focus on what's real, man, Sometimes life is scary and dark",
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 3,
    },
    columnKey: boardColumns.find((column) => column.index === 1),
  },
  {
    id: '4',
    content: {
      name: 'Is that where creativity comes from? From sad biz?',
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 4,
    },
    columnKey: boardColumns.find((column) => column.index === 3),
  },
];


export const board: Board = {
  id: '1',
  name: 'Hatchway product',
  columns: boardColumns,
  createdAt: date,
  updatedAt: date,
};