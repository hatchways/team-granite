import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { IDropzoneProps } from 'react-dropzone-uploader';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
interface Props {
  handleUpload: IDropzoneProps['onSubmit'];
  handleClose: () => void;
  open: boolean;
}

const EditProfilePhotoDialog = ({ handleUpload, handleClose, open }: Props): JSX.Element => {
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string>('');

  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
      <Grid container className={classes.root}>
        <Grid container item xs={12} justify="center" className={classes.dialogTitle}>
          <Typography variant="h5">Upload Profile Photo</Typography>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Avatar alt="Profile Image" src={previewPhotoUrl} className={classes.avatar} />
        </Grid>
        <Grid container item xs={12} justify="center">
          <ImageUpload handleUpload={handleUpload} setPreviewProfilePhoto={setPreviewPhotoUrl} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default EditProfilePhotoDialog;
