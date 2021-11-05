import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { useBoardContext } from '../../context/useBoardContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function Column(props) {
  const classes = useStyles();
  const { boardData } = useBoardContext();
  const { column, index } = props;

  return (
    <Draggable draggableId={column.id} index={index} type="column">
      {(provided) => (
        <Grid className={classes.column} item ref={provided.innerRef} {...provided.draggableProps}>
          <Grid item ref={provided.innerRef} {...provided.dragHandleProps} direction="row">
            <Typography className={classes.columnTitle} variant="h5">
              {column.title}
            </Typography>
            <MoreHorizIcon />
          </Grid>
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <Grid {...provided.droppableProps} ref={provided.innerRef}>
                {column.cardIds.map((cardId, index) => {
                  const card = boardData.cards[cardId];
                  return <Card key={card.id} card={card} index={index} />;
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </Grid>
      )}
    </Draggable>
  );
}
