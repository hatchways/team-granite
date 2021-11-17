import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hoverPointer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  descriptionIcon: {
    color: 'blue',
  },
  title: {
    marginBottom: '5px',
  },
}));

export default useStyles;
