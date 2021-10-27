import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'relative',
    height: '80px',
    alignItems: 'center',
    minWidth: '800px',
  },
  logo: {
    position: 'absolute',
    left: '3%',
  },
  navbarLinks: {
    position: 'absolute',
    display: 'flex',
    right: '35%',
    minWidth: '290px',
    justifyContent: 'space-between',
  },
  navbarLinkDiv: {
    width: '40%',
  },
  navbarLink: {
    color: 'grey',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: '12px',
  },
  navbarIcon: {
    fontSize: '20px',
  },
  navbarLinkSelected: {
    color: 'cornflowerblue',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontSize: '12px',
  },

  navbarButton: {
    position: 'absolute',
    right: '10%',
    minWidth: '145px',
  },
  buttonIcon: {
    fontSize: '13px',
    color: 'white',
  },
  createButton: {
    backgroundColor: '#6281FE',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    padding: '13px 25px 13px 25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    fontSize: '12px',
    cursor: 'pointer',
  },

  navbarImage: {
    border: '1px solid black',
    position: 'absolute',
    right: '3%',
    width: '30px',
    height: '30px',
    borderRadius: '15px',
  },
}));

export default useStyles;
