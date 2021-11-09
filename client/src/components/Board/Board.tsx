import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import { useBoardContext } from '../../context/useBoardContext';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';
import { Column as ColInterface } from '../../mocks/mockBoardData';

interface Props {
  location: string;
}

const Board = (): JSX.Element => {
  const classes = useStyles();

  const { boardData, updateBoardData } = useBoardContext();

  if (!boardData) {
    return <></>;
  }

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const columns = Array.from(boardData.columns);

      const [targetColumn] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, targetColumn);

      boardData.columns = columns;
      console.log(boardData);
      updateBoardData(boardData);
      return;
    }

    const startColumn = boardData.columns.find((column) => column._id === source.droppableId);
    const endColumn = boardData.columns.find((column) => column._id === destination.droppableId);

    if (!startColumn || !endColumn) {
      console.log('OOHNO');
      return;
    }

    if (startColumn === endColumn) {
      const column = startColumn;
      const cards = Array.from(column.cards);

      const [newCard] = cards.splice(source.index, 1);
      cards.splice(destination.index, 0, newCard);

      column.cards = cards;
      const colIndex = boardData.columns.findIndex((innerColumn) => innerColumn._id === column._id);

      boardData.columns[colIndex] = column;
      updateBoardData(boardData);

      return;
    }

    const startCards = Array.from(startColumn.cards);
    const [Card] = startCards.splice(source.index, 1);

    startColumn.cards = startCards;

    const endCards = Array.from(endColumn.cards);
    endCards.splice(destination.index, 0, Card);

    endColumn.cards = endCards;

    const startColIndex = boardData.columns.findIndex((innerColumn) => innerColumn._id === startColumn._id);
    const endColIndex = boardData.columns.findIndex((innerColumn) => innerColumn._id === endColumn._id);

    boardData.columns[startColIndex] = startColumn;
    boardData.columns[endColIndex] = endColumn;

    updateBoardData(boardData);
  };

  const AddColumnButton = (props: Props) => {
    const { location } = props;

    const useStyles = makeStyles(() => ({
      colButton: {
        margin: '10px',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        borderRadius: '5px',
        '&:hover': {
          backgroundColor: 'grey',
          opacity: 0.4,
        },
        '&:hover $icon': {
          opacity: 1,
        },
      },

      icon: {
        margin: '10px',
        opacity: 0,
      },
    }));

    const classes = useStyles();

    return (
      <Grid
        container
        item
        xs={1}
        style={{
          alignItems: 'center',
        }}
      >
        <Grid container className={classes.colButton} justify={location === 'left' ? 'flex-end' : 'flex-start'}>
          <ControlPointIcon className={classes.icon} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container xs={12} style={{ minHeight: '500px' }}>
      <AddColumnButton location={'left'} />
      <Grid item xs={10}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="column-list" direction="horizontal" type="column">
            {(provided) => (
              <Grid container className={classes.centerContent} {...provided.droppableProps} ref={provided.innerRef}>
                {boardData.columns.map((column: ColInterface, index: number) => {
                  return <Column key={column._id} column={column} index={index} />;
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <AddColumnButton location={'right'} />
    </Grid>
  );
};

export default Board;
