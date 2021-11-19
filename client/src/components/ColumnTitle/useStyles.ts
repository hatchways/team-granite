import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
  },
  inputs: {
    fontSize: 22,
    fontWeight: 400,
    margin: 0,
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: '5px',
    backgroundColor: '#759CFC',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  buttonGroup: {
    marginLeft: '40%',
  },

  columnTitle: {
    fontSize: 22,
    fontWeight: 400,
    marginBottom: '20px',
    fontFamily: 'roboto',
  },
}));

export default useStyles;
