import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      oldPassword: string;
      newPassword: string;
    }>,
  ) => void;
}

const ChangePasswordForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().max(100, 'Password is too long').min(6, 'Password too short'),
        newPassword: Yup.string().max(100, 'Password is too long').min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="old_password"
            label={<Typography className={classes.label}>Old Password</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="old_password"
            helperText={touched.oldPassword ? errors.oldPassword : ''}
            error={touched.oldPassword && Boolean(errors.oldPassword)}
            value={values.oldPassword}
            onChange={handleChange}
          />
          <TextField
            id="new_password"
            label={<Typography className={classes.label}>New Password</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.newPassword ? errors.newPassword : ''}
            error={touched.newPassword && Boolean(errors.newPassword)}
            value={values.newPassword}
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

export default ChangePasswordForm;
