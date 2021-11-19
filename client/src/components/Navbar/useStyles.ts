import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'space-between',
    padding: '12px 0px 12px 0px',
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
    boxShadow: 'none',
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
  boardsButtonBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16%',
    marginBottom: '10%',
  },
  addTitleButton: {
    width: '40%',
  },
}));

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
}))(MuiDialogContent);
export const StyledButton = withStyles({
  root: {
    fontSize: '13px',
    backgroundColor: '#6281FE',
    color: 'white',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'purple',
      boxShadow: 'none',
    },
  },
})(Button);

export default useStyles;
