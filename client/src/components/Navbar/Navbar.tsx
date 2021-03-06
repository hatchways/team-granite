import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Dialog, FormControl, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import useStyles, { StyledButton } from './useStyles';
import logoImage from './logo.jpg';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Close from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import BoardsNavbar from '../BoardsNavbar/BoardsNavbar';
import { DialogContent } from './useStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import getProfilePhoto from '../../helpers/APICalls/getProfilePhoto';
import EditProfilePhotoDialog from '../EditProfilePhotoDialog/EditProfilePhotoDialog';
import { IDropzoneProps } from 'react-dropzone-uploader';
import uploadProfilePhoto from '../../helpers/APICalls/uploadProfilePhoto';

export interface Props {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
export interface IBoards {
  board: string;
}

const Navbar = (props: { boardName: string }): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [boards, setBoards] = useState<IBoards[]>([]);
  const totalTitle = boards;

  const [openImgDialog, setOpenImgDialog] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState<string>('');
  const boardsTitle = { board: title };
  useEffect(() => {
    getProfilePhoto().then((data) => {
      if (data.success) {
        setImageSource(data.success.imageURI);
      }
    });
  }, [imageSource]);

  const handleUpload: IDropzoneProps['onSubmit'] = (files) => {
    uploadProfilePhoto(files[0].file).then((data) => {
      if (data.success) {
        setImageSource(data.success.imageURI);
      }
    });
    setOpenImgDialog(false);
  };

  const handlePhotoDialogClose = () => {
    setOpenImgDialog(false);
  };

  const handleAvatarClick = () => {
    setOpenImgDialog(true);
  };

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
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmitBoard = () => {
    setBoards([...boards, boardsTitle]);
    setTitle('');
  };

  const handleDelete = (titleName: string): void => {
    setBoards(
      boards.filter((boardtitle) => {
        return boardtitle.board != titleName;
      }),
    );
  };
  return (
    <Box>
      <Grid container className={classes.container} xs={12}>
        <Grid item container justify="space-between" xs={12} alignItems="center">
          <Grid item xs={4}>
            <Box ml={3}>
              <img src={logoImage} alt="logo" />
            </Box>
          </Grid>

          <Grid item container xs={4}>
            <Router>
              <Grid item container justify="space-evenly">
                <NavLink exact to="/Dashboard" className={classes.navNotActive} activeClassName={classes.navActive}>
                  <Grid item container justify="flex-end" spacing={1} alignItems="center">
                    <Grid item>
                      <DashboardIcon />
                    </Grid>
                    <Grid item className={classes.navbarLinkTitle}>
                      Dashboard
                    </Grid>
                  </Grid>
                </NavLink>
                <NavLink exact to="/Calender" className={classes.navNotActive} activeClassName={classes.navActive}>
                  <Grid item container justify="flex-end" spacing={1} alignItems="center">
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
              <StyledButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Create board
              </StyledButton>
            </Box>
          </Grid>
          <Grid item>
            <Box mr={3}>
              <Avatar alt="Avatar" src={imageSource} onClick={handleAvatarClick} />
              <EditProfilePhotoDialog
                handleUpload={handleUpload}
                handleClose={handlePhotoDialogClose}
                open={openImgDialog}
              />
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
                <StyledButton variant="contained" className={classes.addTitleButton} onClick={handleSubmitBoard}>
                  Create
                </StyledButton>
              </Box>
            </FormControl>
          </DialogContent>
        </Box>
      </Dialog>

      <BoardsNavbar boardsTitle={totalTitle} handleDelete={handleDelete} />
    </Box>
  );
};

export default Navbar;
