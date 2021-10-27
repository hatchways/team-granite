import { makeStyles } from '@material-ui/core/styles';

const fontWeight = 600;
const fontFamily = "'Urbanist', sans-serif'";
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    height: '70px',
    alignItems: 'center',
    minWidth: '800px',
    backgroundColor: '#6281FE',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: '3%',
    color: 'white',
    fontWeight: fontWeight,
    fontFamily: fontFamily,
  },
  toggleIcon: {
    marginRight: '3%',
    color: 'white',
  },
}));

export default useStyles;
