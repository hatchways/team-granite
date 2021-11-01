import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import updateProfile from '../../helpers/APICalls/updateProfile';
import changePassword from '../../helpers/APICalls/changePassword';
import EditProfileForm from './EditProfileForm/EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function EditProfile(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser, updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleEditSubmit = (
    { newEmail, newUsername }: { newEmail: string; newUsername: string },
    { setSubmitting }: FormikHelpers<{ newEmail: string; newUsername: string }>,
  ) => {
    console.log(newUsername, newEmail);
    updateProfile(newUsername, newEmail).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        updateSnackBarMessage('Profile Edited');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handlePasswordSubmit = (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { setSubmitting }: FormikHelpers<{ oldPassword: string; newPassword: string }>,
  ) => {
    changePassword(oldPassword, newPassword).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateSnackBarMessage('Success');
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const history = useHistory();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Edit Your Profile
                </Typography>
                <EditProfileForm handleSubmit={handleEditSubmit} loggedInUser={loggedInUser} />
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography className={classes.welcome} component="h1" variant="h5">
                Change Password
              </Typography>
              <ChangePasswordForm handleSubmit={handlePasswordSubmit} />
            </Grid>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
      </Grid>
    </Grid>
  );
}
