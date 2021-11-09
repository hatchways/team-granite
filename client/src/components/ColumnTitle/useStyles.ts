import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    fontSize: 22,
    fontWeight: 400,
    margin: 0,
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(1),
    width: 70,
    height: 25,
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
