import { Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardInterface } from '../../interface/Board';

interface Props {
  card: CardInterface;
  index: number;
}

const Card = (props: Props): JSX.Element => {
  const { card, index } = props;

  const classes = useStyles({ color: card.color });
  return (
    <Draggable index={index} draggableId={card._id}>
      {(provided) => (
        <Paper
          className={classes.root}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Grid item className={classes.colorBar} />
          <Grid item className={classes.cardContent}>
            <Typography>{card.name}</Typography>
          </Grid>
        </Paper>
      )}
    </Draggable>
  );
};

export default Card;
