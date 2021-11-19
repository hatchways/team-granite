import Dropzone, { IDropzoneProps, ILayoutProps, ISubmitButtonProps } from 'react-dropzone-uploader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import SaveIcon from '@material-ui/icons/Save';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@material-ui/core';

interface Props {
  handleUpload: IDropzoneProps['onSubmit'];
}

const FileUpload = ({ handleUpload }: Props): JSX.Element => {
  const classes = useStyles();

  const Layout = ({ input, submitButton, dropzoneProps, files, extra: { maxFiles }, previews }: ILayoutProps) => {
    return (
      <Grid container className={classes.layout}>
        {previews !== null
          ? previews.map((preview) => {
              return (
                <Grid item xs={12} key={uuidv4()}>
                  <Typography>{preview}</Typography>
                </Grid>
              );
            })
          : ''}
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
      SubmitButtonComponent={Submit}
      inputContent={'Drag and Drop a file here, or click to select files.'}
      inputWithFilesContent={'Add more files'}
    />
  );
};

export default FileUpload;
