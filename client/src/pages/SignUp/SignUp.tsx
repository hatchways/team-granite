import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import SignUpForm from './SignUpForm/SignUpForm';
import loginDemoUser from '../../helpers/APICalls/loginDemoUser';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
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
            Sign up to Kanban
          </Typography>
        </Grid>
        <Grid xs={12} className={`${classes.center} ${classes.loginDiv}`}>
          <SignUpForm handleSubmit={handleSubmit} />
          <Typography onClick={handleClick} className={`${classes.center} ${classes.linkText}`}>
            Login Demo User
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Divider />
          <Typography className={`${classes.center} ${classes.bottomText}`} component="h1" variant="h5">
            Already have an account?
          </Typography>
          <Link to="/login" className={classes.linkProp}>
            <Typography className={`${classes.center} ${classes.linkText}`} component="h1" variant="h5">
              Login
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
