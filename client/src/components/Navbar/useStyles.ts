import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'space-between',
    padding: '12px 0px 12px 0px',
  },

  box: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  miniBox: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  miniBoxAlign: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  navbarLinkTitle: {
    fontSize: '13px',
  },
  buttonNavbar: {
    margin: theme.spacing(1),
    fontSize: '13px',
    backgroundColor: '#6281FE',
    color: 'white',
    textTransform: 'none',
  },

  navNotActive: {
    color: 'grey',
    textDecoration: 'none',
  },
  navActive: {
    color: 'cornflowerblue',
    textDecoration: 'none',
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  dialogWidth: {
    minWidth: '350px',
  },
  iconTitleBox: { padding: '5px 0px 10px 0px' },
  titleBoxContent: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '20px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcons: {
    color: 'cornflowerblue',
    marginRight: '10px',
    marginTop: '1%',
  },
  formControl: { width: '80%' },
  boardsButton: {
    width: '40%',
    backgroundColor: 'cornflowerblue',
    color: 'white',
  },
  boardsButtonBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16%',
    marginBottom: '10%',
  },
}));

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
}))(MuiDialogContent);

export default useStyles;
