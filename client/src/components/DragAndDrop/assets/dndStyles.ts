import { makeStyles } from '@material-ui/core/styles';

const [grid, borderRadius, black, scrollHeight, nudeColor, leaving, entering, Height, placeholder, borderLine] =
      ['8px', '2px', '#2e2e30', '94%', '#f4f6ff', '#ffeaea', '#eaffeb', '30px', '#e5ecfc', '#7aa1fc'];
      
const dndStyles = makeStyles((theme) => ({
  columnParentContainer: {
    marginTop: '50px',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    '& > div': {
      color: black,
      padding: '2.5px',
      borderRadius: '10px',
    },
  },

  column: {
    backgroundColor: nudeColor,
    width: '250px !important',
    h2: {
      fontWeight: 600,
      padding: '10px',
      color: '#f5ee8d',
    },
    padding: '10px',
    margin: '0 10px',
    borderRadius: '10px',
    userSelect: 'none',
    minHeight: Height,
  },

  columnHeader: {
    padding: '10px',
    fontWeight: 600,
    letterSpacing: '1px',
  },

  headerDrag: {
    background: '#d0c96b',
    color: '#fff',
  },

  scrollContainer: {
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: scrollHeight,
  },

  item_container: {
    borderRadius: borderRadius,
    border: '2px solid transparent',
    padding: grid,
    minHeight: '40px',
    marginBottom: grid,
    userSelect: 'none',

    '&:hover, &:active': {
      textDecoration: 'none',
    },

    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
      background: leaving,
    },
    background: 'red',
  },

  dropzone: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    background: 'transparent',
    minHeight: Height,
    padding: '5px 2.5px 15px',
  },

  '.wrapper, .wrapperOver, .wrapperFrom': {
    minHeight: Height,
    display: 'flex',
    flex: 1,
    opacity: 1,
    transition: 'backgroundColor 0.2s ease, opacity 0.1s ease',
    userSelect: 'none',
  },

  '.wrapperFrom, .dropFrom': {
    backgroundColor: leaving,
  },
  '.wrapperOver, .dropOver': {
    backgroundColor: entering,
  },

  columnItem: {
    background: '#fff !important',
    width: '100%',
    boxShadow: 'none',
    padding: '15px',
    color: black,
    letterSpacing: '1px',
    marginBottom: '15px',
    borderRadius: '5px',
    textAlign: 'justify',
    '& p': {
      fontWeight: 500,
    },
  },

  dragging: {
    width: '100%',
    letterSpacing: '1px',
    background: leaving,
    boxShadow: '0px 0px 20px 0px #cdd8f5',
    transition: 'backgroundColor 0.2s ease, opacity 0.1s ease',
    padding: '15px',
    color: black,
    marginBottom: '15px',
    borderRadius: '5px',
    textAlign: 'justify',
    '& p': {
      fontWeight: 500,
    },
  },

  avatar: {
    height: '10px',
    width: '50px',
    borderRadius: '20px',
    margin: '5px 0 20px',
  },

  colDragOver: {
    background: entering,
  },

  colDragFrom: {
    background: placeholder,
  },

  button: {
    color: '#bac4dd',
  },
}));

export default dndStyles;
