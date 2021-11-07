import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import { useBoardContext } from '../../context/useBoardContext';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const Board = () => {
  const classes = useStyles();

  const { boardData, setBoardData } = useBoardContext();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const columnIds = Array.from(boardData.board.columnIds);
      columnIds.splice(source.index, 1);
      columnIds.splice(destination.index, 0, draggableId);

      boardData.board.columnIds = columnIds;

      setBoardData(boardData);
      return;
    }

    const startColumn = boardData.columns[source.droppableId];
    const endColumn = boardData.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const column = startColumn;
      const cardIds = Array.from(column.cardIds);

      cardIds.splice(source.index, 1);
      cardIds.splice(destination.index, 0, draggableId);

      column.cardIds = cardIds;
      boardData.columns[column.id] = column;
      setBoardData(boardData);

      return;
    }

    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);

    startColumn.cardIds = startCardIds;

    const endCardIds = Array.from(endColumn.cardIds);
    endCardIds.splice(destination.index, 0, draggableId);

    endColumn.cardIds = endCardIds;

    boardData.columns[source.droppableId] = startColumn;
    boardData.columns[destination.droppableId] = endColumn;

    setBoardData(boardData);
  };

  const AddColumnButton = (props) => {
    const { location } = props;

    return (
      <Grid item xs={1} style={{ backgroundColor: 'grey', opacity: 0.4 }}>
        <ControlPointIcon />
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
                {boardData.board.columnIds.map((columnId, index) => {
                  const column = boardData.columns[columnId];
                  return <Column key={column.id} column={column} index={index} />;
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
