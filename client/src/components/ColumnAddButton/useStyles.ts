import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
  },
  colButton: {
    margin: '10px',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'grey',
      opacity: 0.4,
    },
    '&:hover $icon': {
      opacity: 1,
    },
  },
  icon: {
    margin: '10px',
    opacity: 0,
  },
}));

export default useStyles;
