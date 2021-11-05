import { Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import { Draggable } from 'react-beautiful-dnd';

const Card = (props) => {
  const { card, index } = props;

  const classes = useStyles();

  const ColorBar = (props) => {
    const { color } = props;

    const style = {
      backgroundColor: color,
      minHeight: '7px',
      maxWidth: '18%',
      borderRadius: '8px',
    };

    return <Grid style={style}></Grid>;
  };

  return (
    <Draggable index={index} draggableId={card.id} type="card">
      {(provided) => (
        <Paper
          className={classes.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Grid item className={classes.colorBar}>
            <ColorBar color={card.color} />
          </Grid>
          <Grid item className={classes.cardContent}>
            <Typography>{card.title}</Typography>
          </Grid>
        </Paper>
      )}
    </Draggable>
  );
};

export default Card;
