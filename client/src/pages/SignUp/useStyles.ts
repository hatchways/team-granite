import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    // minHeight: '100px',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
  },
  welcome: {
    fontSize: 35,
    paddingBottom: 15,
    color: '#000000',
    fontWeight: 550,
    fontFamily: "'Open Sans'",
  },
  welcomeDiv: {
    marginTop: 180,
  },
  loginDiv: {
    paddingTop: 50,
    paddingBottom: 100,
  },
  imageFill: {
    width: '100%',
    height: '100%',
  },
  center: {
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 17,
    paddingTop: 50,
    fontWeight: 1000,
  },
  linkText: {
    fontSize: 17,
    paddingTop: 10,
    textDecoration: 'none',
    fontWeight: 1000,
    color: '#759CFC',
  },
  linkProp: {
    textDecoration: 'none',
  },
}));

export default useStyles;
