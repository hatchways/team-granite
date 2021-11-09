import { makeStyles, Theme } from '@material-ui/core/styles';

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
}));

export default useStyles;
