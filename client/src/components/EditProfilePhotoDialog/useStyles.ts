import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 'auto',
  },
  dialogTitle: {
    padding: '20px',
    borderBottom: '1px solid',
  },
  avatar: {
    margin: '20px',
    alignContent: 'center',
    width: '85px',
    height: '85px',
  },
}));

export default useStyles;
