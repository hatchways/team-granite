import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DetailedCardForm from './DetailedCardForm';
import { DialogContent } from './useStyles';
import useStyles from './useStyles';
import { Box } from '@material-ui/core';
import EventNote from '@material-ui/icons/EventNote';

interface Props {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
const DetailedCard: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const DialogTitle = (props: Props) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h5" className={classes.cardTitle}>
          {children}
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Typography>
      </MuiDialogTitle>
    );
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.fixWidth }}
      >
        <Box className={classes.fixWidth}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography className={classes.titleBoxContent}>
              <Box className={classes.cardIcons}>
                <EventNote />
              </Box>
              Midterm exam
              <Box className={classes.colorDisplay}></Box>
            </Typography>
          </DialogTitle>
          <Box className={classes.subTitle}>
            <Typography>In list &quot;Math&quot;</Typography>
          </Box>
          <DialogContent dividers>
            <DetailedCardForm />
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
};
export default DetailedCard;
