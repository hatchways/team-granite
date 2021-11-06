import Dropzone, { DropzoneState } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from './useStyles';
import { useState } from 'react';
import { Input, Typography } from '@material-ui/core';

interface Props {
  handleUpload: (files: File[]) => void;
}

interface URL {
  name: string;
  preview: string;
}

const ImageUpload = ({ handleUpload }: Props): JSX.Element => {
  const classes = useStyles();
  const [files, setFiles] = useState<URL[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  };

  const previews = files.map((file: URL) => (
    <Grid className={classes.thumb} key={file.name}>
      <Grid className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} />
      </Grid>
    </Grid>
  ));

  return (
    <Dropzone maxFiles={1} onDrop={onDrop}>
      {(state: DropzoneState) => (
        <>
          <Grid container>
            <Grid {...state.getRootProps({ className: classes.dropzone })}>
              <Input inputProps={state.getInputProps()} />
              <Typography>Drag and drop some files here, or click to select files</Typography>
            </Grid>
          </Grid>
          <Grid className={classes.center}>{previews}</Grid>
          <Button
            onClick={() => {
              handleUpload(state.acceptedFiles);
            }}
          >
            Change or Add Image
          </Button>
        </>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
