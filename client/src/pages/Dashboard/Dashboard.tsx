import { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import Board from '../../components/Board/Board';
import Navbar from '../../components/Navbar/Navbar';
import loadBoard from '../../helpers/APICalls/loadBoard';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useBoardContext } from '../../context/useBoardContext';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();
  const { boardData, updateBoardData } = useBoardContext();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  if (!boardData) {
    loadBoard().then((data) => {
      if (data.success) {
        updateBoardData(data.success.board);
      } else if (data.error) {
        updateSnackBarMessage(data.error.message);
      }
    });
  }

  return (
    <>
      <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
        <CssBaseline />
        <Grid item className={classes.drawerWrapper}>
          <Navbar boardName={boardData ? boardData.name : 'No Board'} />
        </Grid>
        <Board />
      </Grid>
    </>
  );
}
