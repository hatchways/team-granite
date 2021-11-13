import Dropzone, { IDropzoneProps, ILayoutProps, ISubmitButtonProps } from 'react-dropzone-uploader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import SaveIcon from '@material-ui/icons/Save';

interface Props {
  handleUpload: IDropzoneProps['onSubmit'];
  setPreviewProfilePhoto: (imageUrl: string) => void;
}

const ImageUpload = ({ handleUpload, setPreviewProfilePhoto }: Props): JSX.Element => {
  const classes = useStyles();

  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ file, meta }, status) => {
    setPreviewProfilePhoto(URL.createObjectURL(file));
  };

  const Layout = ({ input, submitButton, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
    return (
      <Grid container>
        <Grid item container xs={12} justify="center" {...dropzoneProps}>
          {files.length < maxFiles && input}
        </Grid>
        <Grid item container justify="center" xs={12}>
          {submitButton}
        </Grid>
      </Grid>
    );
  };

  const Submit = ({ onSubmit, files, disabled }: ISubmitButtonProps) => {
    const handleClick = () => {
      onSubmit(files);
    };

    const _disabled =
      files.some((f) => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)) ||
      !files.some((f) => ['headers_received', 'done'].includes(f.meta.status));

    return (
      <Button
        variant="contained"
        size="large"
        style={{ margin: '20px' }}
        onClick={handleClick}
        disabled={disabled || _disabled}
      >
        <SaveIcon />
        Submit
      </Button>
    );
  };

  return (
    <Dropzone
      classNames={{
        dropzone: classes.dropzone,
        input: classes.input,
        inputLabel: classes.inputLabel,
        inputLabelWithFiles: classes.inputLabelWithFiles,
      }}
      onSubmit={handleUpload}
      LayoutComponent={Layout}
      onChangeStatus={handleChangeStatus}
      SubmitButtonComponent={Submit}
      inputContent={'Drag and Drop a file here, or click to select files.'}
      inputWithFilesContent={'Accept or change photo.'}
    />
  );
};

export default ImageUpload;
