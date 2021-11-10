import { Avatar, Box, Button, Grid } from '@material-ui/core';
import useStyles from './useStyles';
import logoImage from './logo.jpg';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddIcon from '@material-ui/icons/Add';
import BoardsNavbar from '../BoardsNavbar/BoardsNavbar';

const Navbar = (props: { boardName: string }): JSX.Element => {
  const classes = useStyles();
  const { boardName } = props;
  return (
    <Box>
      <Grid container className={classes.container} xs={12}>
        <Grid item container justify="space-between" xs={12}>
          <Grid item xs={4}>
            <Box ml={3}>
              <img src={logoImage} alt="logo" />
            </Box>
          </Grid>

          <Grid item container xs={4}>
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
      <BoardsNavbar boardName={boardName} />
    </Box>
  );
};

export default Navbar;
