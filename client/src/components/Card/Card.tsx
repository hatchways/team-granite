import { Grid, Typography, Paper } from '@material-ui/core';
import useStyles from '../Board/useStyles';
import { Draggable } from 'react-beautiful-dnd';
import { Card as CardInterface } from '../../mocks/mockBoardData';

interface Props {
  card: CardInterface;
  index: number;
}

const Card = (props: Props): JSX.Element => {
  const { card, index } = props;

  const classes = useStyles();

  const ColorBar = (props: { color: string }) => {
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
    <Draggable index={index} draggableId={card._id}>
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
            <Typography>{card.name}</Typography>
          </Grid>
        </Paper>
      )}
    </Draggable>
  );
};

export default Card;
