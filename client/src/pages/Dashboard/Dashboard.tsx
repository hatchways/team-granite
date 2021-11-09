import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import Board from '../../components/Board/Board';
import loadBoard from '../../helpers/APICalls/loadBoard';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useBoardContext } from '../../context/useBoardContext';
import Navbar from '../../components/Navbar/Navbar';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { boardData, updateBoardData } = useBoardContext();
  const { updateSnackBarMessage } = useSnackBar();

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
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <Grid item className={classes.drawerWrapper}>
        <Navbar boardName={boardData ? boardData.name : 'No Board'} />
      </Grid>
      <Board />
    </Grid>
  );
}
