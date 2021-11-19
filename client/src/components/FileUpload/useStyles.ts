import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  layout: {
    padding: '20px',
  },

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
    fontSize: 15,
    paddingTop: '10%',
    paddingLeft: '23%',
  },

  inputLabelWithFiles: {
    height: '100%',
    width: '100%',
    fontSize: 15,
    paddingTop: '10%',
    paddingLeft: '41%',
  },

  center: {
    alignContent: 'center',
  },
}));

export default useStyles;
