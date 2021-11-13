import { Box, Grid, Typography, Paper } from '@material-ui/core';
import dndStyles from '../assets/dndStyles';
import { avatarColor } from './itemList';
import clsx from 'clsx';

export default function ColumnItem({ columnItem, isDragging, provided }) {
  const classes = dndStyles();
  const { name, tag } = columnItem.content;

  const paperStyle = clsx({
    [classes.dragging]: isDragging,
    [classes.columnItem]: !isDragging,
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
          <Box className={avatarColor(classes.avatar, classes, tag)}></Box>
          <Typography>{name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
