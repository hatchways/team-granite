import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
const zIndex = 10;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '50px',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#6281FE',
      boxShadow: 'none',
      zIndex: 10,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,

      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,

      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    sidebarOpenBackground: {
      backgroundColor: 'grey',
      height: '100vh',
      opacity: 0.5,
      top: '-6%',
      marginTop: '-6%',
    },
    backgroundFade: {
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 200,
    },
    deleteIcon: {
      '&:hover': {
        color: 'purple',
      },
    },
  }),
);
export default useStyles;
