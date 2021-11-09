import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import useStyles from './useStyles';
import { CircularProgress, Grid } from '@material-ui/core';
import { useBoardContext } from '../../context/useBoardContext';
import { Column as ColumnInterface } from '../../interface/Board';
import { moveColumn, moveCard } from '../../helpers/boardContext/boardContext';
import ColumnAddButton from '../ColumnAddButton/ColumnAddButton';

const Board = (): JSX.Element => {
  const classes = useStyles();

  const { boardData, updateBoardData } = useBoardContext();

  if (!boardData) {
    return <CircularProgress />;
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
      updateBoardData(moveColumn(boardData, source.index, destination.index));
      return;
    } else {
      updateBoardData(
        moveCard(boardData, source.index, destination.index, source.droppableId, destination.droppableId),
      );
    }
  };

  return (
    <Grid container xs={12} className={classes.root}>
      <ColumnAddButton location={'left'} />
      <Grid item xs={10}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="column-list" direction="horizontal" type="column">
            {(provided) => (
              <Grid container justify="space-between" {...provided.droppableProps} ref={provided.innerRef}>
                {boardData.columns.map((column: ColumnInterface, index: number) => {
                  return <Column key={column._id} column={column} index={index} />;
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <ColumnAddButton location={'right'} />
    </Grid>
  );
};

export default Board;
