import React, { useState } from 'react';
import { Avatar, Box, Button, Dialog, FormControl, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import logoImage from './logo.jpg';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Close from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import BoardsNavbar from '../BoardsNavbar/BoardsNavbar';
import { DialogContent } from './useStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

export interface Props {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
export interface IBoards {
  board: string;
}

const Navbar = (): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const [boards, setBoards] = useState<IBoards[]>([]);
  const totalTitle = boards;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const DialogTitleIcon = (props: Props) => {
    const { onClose, ...other } = props;
    return (
      <MuiDialogTitle className={classes.iconTitleBox} disableTypography {...other}>
        <Typography variant="h5" className={classes.cardTitle}>
          {onClose ? (
            <IconButton aria-label="close" onClick={onClose}>
              <Close />
            </IconButton>
          ) : null}
        </Typography>
      </MuiDialogTitle>
    );
  };
  const DialogTitle = (props: Props) => {
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h5" className={classes.cardTitle}>
          {children}
        </Typography>
      </MuiDialogTitle>
    );
  };
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function handleSubmitBoard() {
    const boardsTitle = { board: title };
    setBoards([...boards, boardsTitle]);
    setTitle('');
  }
  return (
    <Box>
      <Grid container className={classes.container} xs={12}>
        <Grid item container justify="space-between" xs={12}>
          <Grid item xs={4}>
            <Box ml={3}>
              <img src={logoImage} alt="logo" />
            </Box>
          </Grid>

          <Grid item container alignItems="center" xs={4}>
            <Router>
              <Grid item container justify="space-evenly">
                <NavLink exact to="/page2" className={classes.navNotActive} activeClassName={classes.navActive}>
                  <Grid item container justify="flex-end" spacing={1}>
                    <Grid item>
                      <DashboardIcon />
                    </Grid>
                    <Grid item className={classes.navbarLinkTitle}>
                      Dashboard
                    </Grid>
                  </Grid>
                </NavLink>
                <NavLink exact to="/page1" className={classes.navNotActive} activeClassName={classes.navActive}>
                  <Grid item container justify="flex-end" spacing={1}>
                    <Grid item>
                      <CalendarTodayIcon />
                    </Grid>
                    <Grid item className={classes.navbarLinkTitle}>
                      Calender
                    </Grid>
                  </Grid>
                </NavLink>
              </Grid>
            </Router>
          </Grid>

          <Grid item>
            <Box ml={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.buttonNavbar}
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Create board
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box mr={3}>
              <Avatar alt="Avatar" src="" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.dialogWidth }}
      >
        <Box>
          <DialogTitleIcon id="customized-dialog-title-Icon" onClose={handleClose}>
            <Typography></Typography>
          </DialogTitleIcon>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Typography className={classes.titleBoxContent}>Create new board</Typography>
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Add Title"
                inputProps={{ style: { textAlign: 'center' } }}
                onChange={handleTextChange}
                value={title}
              />
              <Box className={classes.boardsButtonBox}>
                <Button variant="contained" className={classes.boardsButton} onClick={handleSubmitBoard}>
                  Create
                </Button>
              </Box>
            </FormControl>
          </DialogContent>
        </Box>
      </Dialog>

      <BoardsNavbar boardsTitle={totalTitle} />
    </Box>
  );
};

export default Navbar;
