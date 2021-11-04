import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import useStyles from './useStyles';
import MenuBook from '@material-ui/icons/MenuBook';
import CloseIcon from '@material-ui/icons/Close';
import AccessTime from '@material-ui/icons/AccessTime';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
const DetailedCardForm: React.FC = () => {
  const classes = useStyles();
  const [addCard, setAddCard] = useState(['Tag', 'Check-list', 'Deadline', 'Attachement', 'Cover']);
  const [actionCard, setActionCard] = useState(['Move', 'Copy', 'Share', 'Delete']);
  return (
    <Box>
      <Grid container xs={12} className={classes.container} direction="row">
        <Grid container item xs={9} direction="column">
          <Box className={classes.itemBox}>
            <Typography className={classes.boxContent}>
              <div>
                <MenuBook className={classes.cardIcons} />
              </div>
              Description:
            </Typography>
            <Box className={classes.boxItems}>
              <textarea
                name="description"
                rows={3}
                cols={57}
                className={classes.textArea}
                placeholder="Write a description"
              />
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
              <div>
                <AccessTime className={classes.cardIcons} />
              </div>
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
              <div>
                <ChatBubbleOutline className={classes.cardIcons} />
              </div>
              Add comment:
            </Typography>
            <Box className={classes.boxItems}>
              <textarea name="comments" rows={3} cols={57} className={classes.textArea} placeholder="Write a comment" />
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
              {addCard.map((item, key) => {
                return (
                  <Button key={key} variant="contained">
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
