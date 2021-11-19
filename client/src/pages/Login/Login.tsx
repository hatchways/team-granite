import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import loginDemoUser from '../../helpers/APICalls/loginDemoUser';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleClick = () => {
    loginDemoUser().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={6}>
        <img
          src="https://res.cloudinary.com/dnisjqp90/image/upload/v1635871008/Images/sign-up2_e7xshm.png"
          className={classes.imageFill}
        />
      </Grid>
      <Grid item xs={6}>
        <Grid xs={12} className={`${classes.center} ${classes.welcomeDiv}`}>
          <Typography className={classes.welcome} component="h1" variant="h5">
            Welcome back!
          </Typography>
        </Grid>
        <Grid xs={12} className={`${classes.center} ${classes.loginDiv}`}>
          <LoginForm handleSubmit={handleSubmit} />
          <Typography onClick={handleClick} className={`${classes.center} ${classes.linkText}`}>
            Login Demo User
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Divider />
          <Typography className={`${classes.center} ${classes.bottomText}`} component="h1" variant="h5">
            Do not have an account?
          </Typography>
          <Link to="/signup" className={classes.linkProp}>
            <Typography className={`${classes.center} ${classes.linkText}`} component="h1" variant="h5">
              Create
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
