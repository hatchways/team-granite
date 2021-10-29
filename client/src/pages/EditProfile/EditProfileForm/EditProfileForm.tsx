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
      new_username,
      new_email,
      new_password,
    }: {
      new_email: string;
      new_password: string;
      new_username: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      new_email: string;
      new_password: string;
      new_username: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        new_email: '',
        new_password: '',
        new_username: '',
      }}
      validationSchema={Yup.object().shape({
        new_username: Yup.string().max(40, 'Username is too long'),
        new_email: Yup.string().email('Email is not valid'),
        new_password: Yup.string().max(100, 'Password is too long').min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            id="new_username"
            label={<Typography className={classes.label}>New Username</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="new_username"
            autoComplete="new_username"
            autoFocus
            helperText={touched.new_username ? errors.new_username : ''}
            error={touched.new_username && Boolean(errors.new_username)}
            value={values.new_username}
            onChange={handleChange}
          />
          <TextField
            id="new_email"
            label={<Typography className={classes.label}>New E-mail address</Typography>}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="new_email"
            autoComplete="new_email"
            helperText={touched.new_email ? errors.new_email : ''}
            error={touched.new_email && Boolean(errors.new_email)}
            value={values.new_email}
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
            helperText={touched.new_password ? errors.new_password : ''}
            error={touched.new_password && Boolean(errors.new_password)}
            value={values.new_password}
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

export default SignUpForm;
