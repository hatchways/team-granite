import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import useStyles from './useStyles';
import { ButtonGroup, Typography } from '@material-ui/core';

interface Props {
  handleSubmit: (
    {
      title,
    }: {
      title: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      title: string;
    }>,
  ) => void;
  handleCancel: () => void;
  isEditable: boolean;
  title: string;
}

export default function ColumnTitle({ handleSubmit, handleCancel, isEditable, title }: Props): JSX.Element {
  const classes = useStyles();

  const ColumnTitleForm = (): JSX.Element => (
    <Formik
      initialValues={{
        title: title,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required('Title is required').max(100, 'Password is too long').min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="title"
            fullWidth
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="title"
            autoComplete="title"
            autoFocus
            helperText={touched.title ? errors.title : ''}
            error={touched.title && Boolean(errors.title)}
            value={values.title}
            onChange={handleChange}
          />
          <ButtonGroup className={classes.buttonGroup}>
            <Button type="submit" size="large" variant="contained" className={classes.submit}>
              {'Rename'}
            </Button>
            <Button type="button" size="large" variant="contained" className={classes.submit} onClick={handleCancel}>
              {'Cancel'}
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  );

  const ColumnTitle = () => (
    <Typography className={classes.columnTitle} variant="h5">
      {title}
    </Typography>
  );

  return <Box className={classes.root}>{isEditable ? <ColumnTitleForm /> : <ColumnTitle />}</Box>;
}
