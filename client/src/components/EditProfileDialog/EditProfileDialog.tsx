/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ImageUpload from '../ImageUpload/ImageUpload';
import useStyles from './useStyles';

interface Props {
  handleUpload: (files: File[], set_profile_photo_url: (string) => void) => void;
}

const EditProfileDialog = ({ handleUpload, handleClose, open }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Modify Profile Photo</DialogTitle>
      <ImageUpload handleUpload={handleUpload} />
    </Dialog>
  );
};

export default EditProfileDialog;
