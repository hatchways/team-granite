import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},

  centerContent: {
    justifyContent: 'center',
  },

  column: {
    backgroundColor: '#F4F6FF',
    width: '350px',
    boxShadow: '2px 2px 4px rgba(0,0,0,.4)',
    padding: '15px',
    margin: '10px',
    borderRadius: '10px',
  },

  columnTitle: {
    marginBottom: '10px',
    flexGrow: 1,
    fontFamily: 'roboto',
  },

  dragArea: {
    minHeight: '10px',
  },

  card: {
    padding: '10px',
    letterSpacing: '1px',
    marginBottom: '10px',
  },

  colorBar: {
    padding: '10px',
  },

  cardContent: {
    padding: '10px',
  },
}));

export default useStyles;
