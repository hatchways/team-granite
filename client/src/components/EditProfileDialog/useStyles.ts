import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },

  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
  },

  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
  },

  img: {
    display: 'block',
    width: 'auto',
    height: '100%',
  },
}));

export default useStyles;
