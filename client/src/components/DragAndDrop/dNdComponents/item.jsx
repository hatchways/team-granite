import { Box, Grid, Typography, Paper } from '@material-ui/core';
import dndStyles from '../assets/dndStyles';
import clsx from 'clsx';

export default function ColumnItem({ columnItem, isDragging, provided }) {
  const classes = dndStyles();
  const { name, description, tag } = columnItem.content;

  const paperStyle = clsx({
    [classes.dragging]: isDragging,
    [classes.columnItem]: !isDragging,
  });

  const avatarColor = clsx(classes.avatar, {
    [classes.default]: tag === 0,
    [classes.green]: tag === 1,
    [classes.red]: tag === 2,
    [classes.gold]: tag === 3,
    [classes.blue]: tag === 4,
    [classes.purple]: tag === 5,
  });

  return (
    <Paper
      className={clsx(paperStyle)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box className={avatarColor}></Box>
          <Typography>{name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
