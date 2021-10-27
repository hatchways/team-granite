import React from 'react';
import useStyles from './useStyles';
import { FaBars } from 'react-icons/fa';

const BoardsNavbar = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.title}>My School Board</div>
      <div className={classes.toggleIcon}>
        <FaBars />
      </div>
    </div>
  );
};

export default BoardsNavbar;
