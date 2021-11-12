import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Navbar from '../../components/Navbar/Navbar';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <Navbar />
      </Grid>
    </Grid>
  );
}
