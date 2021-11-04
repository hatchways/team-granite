import { Theme, withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: '2% 0% 0% 2%',
  },
  container: {
    maxWidth: '650px',
  },
  itemBox: {
    width: '100%',
    fontWeight: 'bold',
    marginBottom: '6%',
    marginLeft: '2%',
  },
  cardIcons: {
    color: 'cornflowerblue',
    marginRight: '10px',
    marginTop: '1%',
  },
  boxContent: {
    display: 'flex',
    fontWeight: 'bold',
  },
  titleBoxContent: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '20px',
    width: '100%',
    alignItems: 'center',
    marginLeft: '10px',
  },
  subTitle: {
    color: theme.palette.grey[500],
    marginLeft: '58px',
    marginBottom: '3%',
    marginTop: '-1%',
    '& p': {
      fontSize: '12px',
    },
  },
  colorDisplay: {
    width: '10%',
    height: '10px',
    backgroundColor: 'red',
    borderRadius: '10px',
    marginLeft: '3%',
  },
  textArea: {
    border: '1px solid lavender',
    padding: '15px',
    borderRadius: '5px',
    fontFamily: 'Sans, Helvetica Neue, sans-serif',
    '&::placeholder': {
      color: theme.palette.grey[500],
    },
  },
  test: {
    minWidth: '700px',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3%',

    '& svg': {
      fontSize: '18px',
    },
  },
  descriptionButton: {
    marginRight: '4%',
    backgroundColor: 'cornflowerblue',
    padding: '1% 5% 1% 5%',
    color: 'white',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'cornflowerblue',
    },
  },
  deadlineBox: {
    marginBottom: '6%',
    marginLeft: '2%',
  },
  actionGrid: {
    marginTop: '6%',
    '& p': {
      color: '#919299',
      fontSize: '10px',
      fontWeight: 'bold',
    },
  },
  addCardBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',

    '& Button': {
      color: '#919299',
      margin: '3px',
      backgroundColor: '#E4E7FF',
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      boxShadow: 'none',
    },
  },
  actionBox: {
    marginBottom: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5%',

    '& Button': {
      color: '#919299',
      margin: '3px',
      backgroundColor: '#E4E7FF',
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      boxShadow: 'none',
    },
  },
  contentB: { marginLeft: '7%', fontSize: '12px' },
  dialog: { color: 'red' },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minWidth: '565px',
  },
}))(MuiDialogContent);

export default useStyles;
