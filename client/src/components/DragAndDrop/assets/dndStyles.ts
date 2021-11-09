import { makeStyles } from '@material-ui/core/styles';

const dndStyles = makeStyles(() => ({
  boardContainer: {
    display: 'block',
    padding: '20px',
  },

  boardTitle: {
    paddingLeft: '50px',
    fontSize: '20px',
    color: '#262626',
    fontWeight: 600,
    marginBottom: '30px',
  },

  boardAside: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    transition: 'background 0.2s ease, opacity 0.1s ease',
    '&:hover': {
      background: 'rgba(0,0,0,.3)',
    },
  },

  columnParentContainer: {
    marginTop: '50px',
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    flex: 'auto',
    '& > div': {
      color: '#2e2e30',
      padding: '2.5px',
      borderRadius: '10px',
    },
  },

  column: {
    backgroundColor: '#f4f6ff',
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
    minHeight: '30px',
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
    maxHeight: '94%',
  },

  item_container: {
    borderRadius: '2px',
    border: '2px solid transparent',
    padding: '8px',
    minHeight: '40px',
    marginBottom: '8px',
    userSelect: 'none',

    '&:hover, &:active': {
      textDecoration: 'none',
    },

    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
      background: '#ffeaea',
    },
    background: 'red',
  },

  dropzone: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    background: 'transparent',
    minHeight: '30px',
    padding: '5px 2.5px 15px',
  },

  '.wrapper, .wrapperOver, .wrapperFrom': {
    minHeight: '30px',
    display: 'flex',
    flex: 1,
    opacity: 1,
    transition: 'backgroundColor 0.2s ease, opacity 0.1s ease',
    userSelect: 'none',
  },

  '.wrapperFrom, .dropFrom': {
    backgroundColor: '#ffeaea',
  },
  '.wrapperOver, .dropOver': {
    backgroundColor: '#eaffeb',
  },

  addCardItem: {
    background: '#fff !important',
    width: '100%',
    boxShadow: 'none',
    padding: '15px',
    color: '#2e2e30',
    letterSpacing: '1px',
    marginBottom: '15px',
    borderRadius: '5px',
    textAlign: 'justify',
    border: '2px solid #7aa1fc',
    '& p': {
      fontWeight: 600,
    },
  },

  columnItem: {
    background: '#fff !important',
    width: '100%',
    boxShadow: 'none',
    padding: '15px',
    color: '#2e2e30',
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
    background: '#ffeaea',
    boxShadow: '0px 0px 20px 0px #cdd8f5',
    transition: 'backgroundColor 0.2s ease, opacity 0.1s ease',
    padding: '15px',
    color: '#2e2e30',
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
    background: '#eaffeb',
  },

  colDragFrom: {
    background: '#e5ecfc',
  },

  button: {
    color: '#bac4dd',
  },

  modalDialog: {
    userSelect: 'none',
    '& .MuiDialog-paper': {
      width: '400px',
      height: '260px',
      padding: '0 15px 18px',
      textAlign: 'center',
      '& .MuiDialogContent-root': {
        overflowY: 'hidden',
        overflowX: 'hidden',
      },
    },
    '& h2': {
      fontWeight: 600,
    },
    '& .close': {
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'none',
    },
  },

  stack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > p': {
      fontWeight: 300,
      color: 'rgba(0,0,0,.4)',
      whiteSpace: 'nowrap',
    },
  },
  avatarx: {
    width: '16px',
    height: '16px',
    marginRight: '2.5px',
    transition: 'background 0.2s ease, box-shadow 0.1s ease',
    border: '.6px solid rgba(0,0,0,.5)',
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '2px 2px 4px rgba(0,0,0,.4)',
    },
  },

  default: {
    background: '#ede4e4',
  },
  green: {
    background: '#5ACD76',
  },
  red: {
    background: '#FF5D48',
  },
  gold: {
    background: '#EDAB1D',
  },
  blue: {
    background: '#59B0FF',
  },
  purple: {
    background: '#D460F7',
  },

  addActionBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
    '& h6': {
      whiteSpace: 'nowrap',
      fontSize: '14px',
    },
  },

  addActionBtnBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default dndStyles;
