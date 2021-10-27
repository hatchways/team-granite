import React, { useState } from 'react';
import useStyles from './useStyles';
import logoImage from './logo.jpg';
import { Link, BrowserRouter } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiCalendar } from 'react-icons/fi';
import { BsPlusLg } from 'react-icons/bs';
import BoardsNavbar from '../BoardsNavbar/BoardsNavbar';
const Navbar = (): JSX.Element => {
  const classes = useStyles();
  const [linkColor, setLinkColor] = useState(false);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logoImage} alt="logo" />
        </div>
        <div className={classes.navbarLinks}>
          <BrowserRouter>
            <div className={classes.navbarLinkDiv}>
              <Link
                to="/"
                onClick={() => setLinkColor(!linkColor)}
                className={`${linkColor ? classes.navbarLink : classes.navbarLinkSelected}`}
              >
                <MdOutlineSpaceDashboard className={classes.navbarIcon} />
                Dashboard
              </Link>
            </div>
            <div className={classes.navbarLinkDiv}>
              <Link
                to="/"
                onClick={() => setLinkColor(!linkColor)}
                className={`${linkColor ? classes.navbarLinkSelected : classes.navbarLink}`}
              >
                <FiCalendar className={classes.navbarIcon} />
                Calender
              </Link>
            </div>
          </BrowserRouter>
        </div>
        <div className={classes.navbarButton}>
          <button className={classes.createButton}>
            <BsPlusLg className={classes.buttonIcon} />
            Create board
          </button>
        </div>
        <div className={classes.navbarImage}>
          <img src="#" alt="" />
        </div>
      </div>
      <BoardsNavbar />
    </>
  );
};
export default Navbar;
