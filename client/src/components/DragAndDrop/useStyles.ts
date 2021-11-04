import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    grid: '8px',
    grid2: '4px',
    borderRadius: '2px',
    black: '#222',
    scrollHeight: '94%',
    nudeColor: '#001e3c',
    leaving: '#ffeaea',
    entering: '#eaffeb',
    Height: '250px',
  },

  columnParentContainer: {
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    '& > div': {
      color: '#fff',
      padding: '2.5px',
      borderRadius: '10px',
    },
  },

  column: {
    backgroundColor: '#001e3c',
    width: '250px !important',
    h2: {
      fontWeight: '600',
      padding: '10px',
      color: '#f5ee8d',
    },
    boxShadow: '2px 2px 4px rgba(0,0,0,.4)',
    padding: '5px',
    margin: '0 10px',
    borderRadius: '10px',
  },

  headerDrag: {
    background: '#d0c96b',
    color: '#fff',
  },

  scrollContainer: {
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: 'var(--scrollHeight)',
  },

  item_container: {
    borderRadius: 'var(--borderRadius)',
    border: '2px solid transparent',
    padding: 'var(--grid)',
    minHeight: '40px',
    marginBottom: 'var(--grid)',
    userSelect: 'none',
    '&:hover, &:active': {
      textDecoration: 'none',
    },
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
      background: 'var(--leaving)',
    },
  },

  dropzone: {
    padding: '0 10px',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    background: 'var(--nudeColor)',
    minHeight: '250px',
  },

  '.wrapper, .wrapperOver, .wrapperFrom': {
    minHeight: 'var(--Height)',
    display: 'flex',
    flex: 1,
    opacity: 1,
    transition: 'background-color 0.2s ease, opacity 0.1s ease',
    userSelect: 'none',
  },

  wrapper: {
    backgroundColor: '#fcfcfc',
  },

  wrapperFrom: {
    backgroundColor: '#fcfcfc',
  },

  dropFrom: {
    backgroundColor: 'var(--leaving)',
  },

  wrapperOver: {
    backgroundColor: 'var(--entering)',
  },

  dropOver: {
    backgroundColor: 'var(--entering)',
  },

  columnItem: {
    background: '#7cc334 !important',
    width: '100%',
    padding: '10px 5px',
    color: '#fff !important',
    letterSpacing: '1px',
    marginBottom: '10px',
    '& avatar': {
      background: 'var(--nudeColor)',
      color: '#fa9fcc',
      fontWeight: '600',
    },
  },

  dragging: {
    background: '#7cc334 !important',
    width: '100%',
    padding: '10px 5px',
    color: '#fff !important',
    letterSpacing: '1px',
    marginBottom: '10px',
    '& avatar': {
      background: 'var(--nudeColor)',
      color: '#fa9fcc',
      fontWeight: 600,
    },
  },
}));

export default useStyles;
