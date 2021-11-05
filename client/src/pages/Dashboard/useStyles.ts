import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = '100%';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 'auto',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    minWidth: '816px',
  },
  dashboard: { backgroundColor: '#FFFFFF' },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export default useStyles;
