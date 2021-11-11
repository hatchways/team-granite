import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import useStyles from './useStyles';
import MenuBook from '@material-ui/icons/MenuBook';
import CloseIcon from '@material-ui/icons/Close';
import AccessTime from '@material-ui/icons/AccessTime';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import { TextField } from '@material-ui/core';
const DetailedCardForm: React.FC = () => {
  const classes = useStyles();
  const [addCard, setAddCard] = useState(['Tag', 'Check-list', 'Deadline', 'Attachement', 'Cover']);
  const [actionCard, setActionCard] = useState(['Move', 'Copy', 'Share', 'Delete']);
  return (
    <Box>
      <Grid item container xs={12} className={classes.container} direction="row">
        <Grid container item xs={9} direction="column">
          <Box className={classes.itemBox}>
            <Typography className={classes.boxContent}>
              <Box>
                <MenuBook className={classes.cardIcons} />
              </Box>
              Description:
            </Typography>
            <Box className={classes.boxItems}>
              <TextField variant="outlined" color="secondary" fullWidth required multiline minRows={3} />
              <Box color="cornflowerblue" className={classes.buttonBox}>
                <Button variant="contained" className={classes.descriptionButton}>
                  Save
                </Button>
                <CloseIcon />
              </Box>
            </Box>
          </Box>
          <Box className={classes.deadlineBox}>
            <Typography className={classes.boxContent}>
              <Box>
                <AccessTime className={classes.cardIcons} />
              </Box>
              Deadline:
            </Typography>
            <Box className={classes.boxItems}>
              <Router>
                <Link to="#">March 10</Link>
              </Router>
            </Box>
          </Box>
          <Box className={classes.itemBox}>
            <Typography className={classes.boxContent}>
              <Box>
                <ChatBubbleOutline className={classes.cardIcons} />
              </Box>
              Add comment:
            </Typography>
            <Box className={classes.boxItems}>
              <TextField variant="outlined" color="secondary" fullWidth required multiline minRows={3} />
              <Box color="cornflowerblue" className={classes.buttonBox}>
                <Button variant="contained" className={classes.descriptionButton}>
                  Save
                </Button>
                <CloseIcon />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid container item xs={2}>
          <Grid item className={classes.actionGrid} container direction="column">
            <Typography> ADD TO CARD:</Typography>
            <Box className={classes.addCardBox}>
              {addCard.map((item) => {
                return (
                  <Button key={item} variant="contained">
                    {item}
                  </Button>
                );
              })}
            </Box>
          </Grid>
          <Grid item className={classes.actionGrid} container direction="column">
            <Typography> ACTIONS:</Typography>
            <Box className={classes.actionBox}>
              {actionCard.map((item, key) => {
                return (
                  <Button key={key} variant="contained">
                    {item}
                  </Button>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedCardForm;
