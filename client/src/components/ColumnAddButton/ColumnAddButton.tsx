import useStyles from './useStyles';
import { Grid } from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

interface Props {
  location: string;
}

const ColumnAddButton = (props: Props): JSX.Element => {
  const { location } = props;

  const classes = useStyles();

  return (
    <Grid container item xs={1} className={classes.root}>
      <Grid container className={classes.colButton} justify={location === 'left' ? 'flex-end' : 'flex-start'}>
        <ControlPointIcon className={classes.icon} />
      </Grid>
    </Grid>
  );
};

export default ColumnAddButton;
