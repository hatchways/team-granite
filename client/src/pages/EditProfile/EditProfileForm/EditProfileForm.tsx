import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';
import { User } from '../../../interface/User';
interface Props {
  handleSubmit: (
    {
      newUsername,
      newEmail,
    }: {
      newUsername: string;
      newEmail: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      newUsername: string;
      newEmail: string;
    }>,
  ) => void;
  loggedInUser: User;
}

const EditProfileForm = ({ handleSubmit, loggedInUser }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        newEmail: loggedInUser.email,
        newUsername: loggedInUser.username,
      }}
      validationSchema={Yup.object().shape({
        newUsername: Yup.string().max(40, 'Username is too long'),
        newEmail: Yup.string().email('Email is not valid'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="newUsername"
            label={<Typography className={classes.label}>Username</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="newUsername"
            autoComplete="newUsername"
            autoFocus
            helperText={touched.newUsername ? errors.newUsername : ''}
            error={touched.newUsername && Boolean(errors.newUsername)}
            value={values.newUsername}
            onChange={handleChange}
          />
          <TextField
            id="newEmail"
            label={<Typography className={classes.label}>E-mail address</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="newEmail"
            autoComplete="newEmail"
            helperText={touched.newEmail ? errors.newEmail : ''}
            error={touched.newEmail && Boolean(errors.newEmail)}
            value={values.newEmail}
            onChange={handleChange}
          />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Update'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
