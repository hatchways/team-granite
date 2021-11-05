import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ImageUpload from '../ImageUpload/ImageUpload';

interface Props {
  handleUpload: (files: File[]) => void;
  handleClose: () => void;
  open: boolean;
}

const EditProfilePhotoDialog = ({ handleUpload, handleClose, open }: Props): JSX.Element => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Modify Profile Photo</DialogTitle>
      <ImageUpload handleUpload={handleUpload} />
    </Dialog>
  );
};

export default EditProfilePhotoDialog;
