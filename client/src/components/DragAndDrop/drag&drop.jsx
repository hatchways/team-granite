import { useState } from 'react';
import { reorderColumn, reorderColumnCardMap } from './reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardColumn from './column';
import classes from './assets/item.module.scss';
import { Box, Grid } from '@material-ui/core';
import { useBoardContext } from '../../context/useBoardContext';

const Board = () => {
  const { boardColumnMap: data, setBoardColumnMap } = useBoardContext();
  const [columns, setColumns] = useState(data);
  const [ordered, setOrdered] = useState(Object.keys(data));

  const onDragEnd = (result) => {
    const { type, combine, source, destination, droppableId, index } = result;

    if (combine) {
      if (type === 'COLUMN') {
        const shallow = [...ordered].splice(source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[source.droppableId];
      const withItemRemoved = [...column].splice(source.index, 1);
      const $_columns = {
        columns,
        [source.droppableId]: withItemRemoved,
      };
      setColumns($_columns);
      setBoardColumnMap(columns);
      return;
    }

    if (!destination) return;
    if (droppableId === destination.droppableId && index === destination.index) return;

    if (type === 'COLUMN') {
      const $_ordered = reorderColumn(ordered, source.index, destination.index);
      setOrdered($_ordered);
      return;
    }

    const updatedData = reorderColumnCardMap({
      columnMap: columns,
      source,
      destination,
    });

    setColumns(updatedData.columnMap);
    setBoardColumnMap({ ...updatedData.columnMap });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            className={classes.columnParentContainer}
            spacing={2}
            sx={{ marginTop: '50px' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Box key={key} className={classes.columnContainer}>
                <BoardColumn index={index} title={key} items={columns[key]} />
              </Box>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
