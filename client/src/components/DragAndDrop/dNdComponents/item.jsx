import { Avatar, Grid, Typography, Paper } from '@material-ui/core';
import useStyles from '../useStyles';

export default function ColumnItem(props) {
  const { columnItem, isDragging, provided } = props;
  const { title, description, tag } = columnItem.content;

  const classes = useStyles();

  return (
    <Paper
      className={isDragging ? classes.dragging : classes.columnItem}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar className={classes.avatar}>{columnItem.id}</Avatar>
        </Grid>
        <Grid item xs>
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
