import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import { Menu, MenuItem, Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { useBoardContext } from '../../context/useBoardContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { MouseEvent, useState } from 'react';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FormikHelpers } from 'formik';
import { Card as CardInterface, Column as ColumnInterface } from '../../interface/Board';
import updateColumn from '../../helpers/APICalls/updateColumn';
import loadBoard from '../../helpers/APICalls/loadBoard';
import { useSnackBar } from '../../context/useSnackbarContext';
import deleteColumn from '../../helpers/APICalls/deleteColumn';

interface Props {
  column: ColumnInterface;
  index: number;
}

export default function Column(props: Props): JSX.Element {
  const classes = useStyles();
  const { column, index } = props;

  const [anchorElement, setAnchorElement] = useState<null | Element | ((element: Element) => Element)>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState(false);

  const { updateBoardData } = useBoardContext();
  const { updateSnackBarMessage } = useSnackBar();

  const isOpen = Boolean(anchorElement);

  const handleMenuClick = (event: MouseEvent<Element>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSubmit = ({ title }: { title: string }, { setSubmitting }: FormikHelpers<{ title: string }>): void => {
    updateColumn({ name: title, index: index }, column.boardId, column._id).then((data) => {
      if (data.success) {
        loadBoard().then((data) => {
          if (data.success) {
            setSubmitting(false);
            updateBoardData(data.success.board);
          } else if (data.error) {
            setSubmitting(false);
            updateSnackBarMessage(data.error.message);
          }
        });
      }
      setIsEditable(false);
    });
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleDeleteColumn = () => {
    deleteColumn(column.boardId, column._id).then((data) => {
      if (data.success) {
        loadBoard().then((data) => {
          if (data.success) {
            updateBoardData(data.success.board);
          } else if (data.error) {
            updateSnackBarMessage(data.error.message);
          }
        });
      }
    });
    setOpen(false);
  };

  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <Grid className={classes.root} item ref={provided.innerRef} {...provided.draggableProps}>
          <Grid className={classes.dragArea} {...provided.dragHandleProps} />
          <Grid item container justify={'space-between'}>
            <ColumnTitle
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              isEditable={isEditable}
              title={column.name}
            />
            <MoreHorizIcon onClick={handleMenuClick} />
          </Grid>
          <Menu anchorEl={anchorElement} open={isOpen} onClose={handleMenuClose}>
            <MenuItem onClick={handleEdit}>Edit Column Title</MenuItem>
            <MenuItem onClick={handleDialogOpen}>Delete Column</MenuItem>
          </Menu>
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>{'Warning'}</DialogTitle>
            <DialogContent>
              <DialogContentText>If you delete the column the cards will be deleted too.</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteColumn}>Agree</Button>
            </DialogActions>
          </Dialog>
          <Droppable droppableId={column._id} type="card">
            {(provided) => (
              <Grid {...provided.droppableProps} ref={provided.innerRef}>
                {column.cards.map((card: CardInterface, index: number) => {
                  return <Card key={card._id} card={card} index={index} />;
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
