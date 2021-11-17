import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '45%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginLeft: '27%',
  },
  label: {
    fontSize: 19,
    color: 'rgb(0,0,0,0.4)',
    paddingLeft: '5px',
  },
  inputs: {
    margin: '6px',
    height: '4rem',
    padding: '5px',
    paddingLeft: '10px',
    boxShadow: '0 0 10px #bac8f2',
    borderRadius: '5px',
    '&::placeholder': {
      textAlign: 'center',
      fontWeight: 1000,
      color: '#000000',
      opacity: 1,
      fontSize: 15,
    },
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 170,
    height: 60,
    borderRadius: '7px',
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#759CFC',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
}));

export default useStyles;
