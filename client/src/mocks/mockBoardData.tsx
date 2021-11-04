import { Board, Column, Card } from '../interface/BoardApiData';

const date = new Date().toLocaleString();

export const boardColumns: Column[] = [
  {
    index: 3,
    title: 'TODO',
    cards: [],
  },
  {
    index: 4,
    title: 'IN_PROGRESS',
    cards: [],
  },
  {
    index: 1,
    title: 'DONE',
    cards: [],
  },
  {
    index: 2,
    title: 'INCOMING',
    cards: [],
  },
];

export const columnItems: Card[] = [
  {
    id: '1',
    content: {
      title: 'Ronaldo Transfer To Man U',
      description: 'Sometimes life is scary and dark',
      deadline: date,
      tag: 1,
    },
    columnKey: boardColumns.find((column) => column.index === 2),
  },
  {
    id: '2',
    content: {
      title: 'Ronaldo Transfer To Man U',
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 2,
    },
    columnKey: boardColumns.find((column) => column.index === 1),
  },
  {
    id: '3',
    content: {
      title: "You got to focus on what's real, man, Sometimes life is scary and dark",
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 3,
    },
    columnKey: boardColumns.find((column) => column.index === 1),
  },
  {
    id: '4',
    content: {
      title: 'Is that where creativity comes from? From sad biz?',
      description: 'Sometimes life is scary and dark',
      deadline: new Date().toLocaleString(),
      tag: 4,
    },
    columnKey: boardColumns.find((column) => column.index === 3),
  },
];


export const board: Board = {
  id: '1',
  title: 'Hatchway product',
  columns: boardColumns,
  createdAt: date,
  updatedAt: date,
};