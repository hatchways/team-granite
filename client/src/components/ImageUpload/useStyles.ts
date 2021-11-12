import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dropzone: {
    margin: '10px',
    borderRadius: '5px',
    height: '120px',
    boxShadow: '3px 3px 5px #aaaaaa',
    alignItems: 'center',
  },

  input: {
    height: '100%',
    widht: '100%',
    opacity: 0,
  },

  inputLabel: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    paddingTop: '10%',
  },

  inputLabelWithFiles: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    paddingTop: '10%',
    paddingLeft: '6%',
  },

  center: {
    alignContent: 'center',
  },
}));

export default useStyles;
