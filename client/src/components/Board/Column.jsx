import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { Menu, MenuItem, Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import { useBoardContext } from '../../context/useBoardContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Column(props) {
  const classes = useStyles();
  const { boardData } = useBoardContext();
  const { column, index } = props;
  // refactor into different files.
  const [anchorElement, setAnchorElement] = useState(null);
  const isOpen = Boolean(anchorElement);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Draggable draggableId={column.id} index={index} type="column">
      {(provided) => (
        <Grid className={classes.column} item ref={provided.innerRef} {...provided.draggableProps}>
          <Grid className={classes.dragArea} {...provided.dragHandleProps} />
          <Grid item container>
            <Typography className={classes.columnTitle} variant="h5">
              {column.title}
            </Typography>
            <MoreHorizIcon onClick={handleClick} />
          </Grid>
          <Menu anchorEl={anchorElement} open={isOpen} onClose={handleClose}>
            <MenuItem>Edit Column Title</MenuItem>
            <MenuItem onClick={handleDialogOpen}>Delete Column</MenuItem>
          </Menu>
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>{'Warning'}</DialogTitle>
            <DialogContent>
              <DialogContentText>If you delete the column the cards will be deleted too.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Agree</Button>
            </DialogActions>
          </Dialog>
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
