import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px',
    letterSpacing: '1px',
    marginBottom: '10px',
  },

  colorBar: (props: { color: string }) => ({
    backgroundColor: props.color,
    minHeight: '10px',
    maxWidth: '18%',
    borderRadius: '8px',
  }),

  cardContent: {
    padding: '10px',
  },
}));

export default useStyles;
