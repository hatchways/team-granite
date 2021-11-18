import Box from '@material-ui/core/Box';
import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  FormControl,
  CircularProgress,
  Dialog,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useStyles from './useStyles';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (
    {
      name,
    }: {
      name: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      name: string;
    }>,
  ) => void;
}

const AddColumnDialog = ({ open, handleClose, handleSubmit }: Props) => {
  const classes = useStyles();
  const inputProps = {
    classes: { input: classes.input },
    disableUnderline: true,
  };
  return (
    <Dialog onClose={handleClose} open={open} classes={{ paper: classes.dialogWidth }}>
      <Box>
        <DialogTitle className={classes.iconTitleBox} disableTypography>
          <Typography variant="h5" className={classes.cardTitle}>
            <IconButton aria-label="close" onClick={handleClose}>
              <Close />
            </IconButton>
          </Typography>
        </DialogTitle>
        <DialogTitle disableTypography>
          <Typography className={classes.titleBoxContent}>Create new board</Typography>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
            })}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit} className={classes.formControl} noValidate>
                <TextField
                  id="name"
                  placeholder="Column Name"
                  fullWidth
                  inputProps={inputProps}
                  variant="outlined"
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && Boolean(errors.name)}
                  value={values.name}
                  onChange={handleChange}
                />
                <Box textAlign="center">
                  <Button type="submit" size="large" variant="contained" className={classes.boardsButton}>
                    {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Create'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
