/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Dropzone, { DropzoneState } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import { useState } from 'react';

interface Props {
  handleUpload: (files: File[]) => void;
}

//lift up the state

const ImageUpload = ({ handleUpload }: Props): JSX.Element => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  };

  const previews = () => {
    return files.map((file: File) => (
      <div className={classes.thumb} key={file.name}>
        <div className={classes.thumbInner}>
          <img src={file.preview} className={classes.img} />
        </div>
      </div>
    ));
  };

  return (
    <Dropzone onDrop={onDrop}>
      {(state: DropzoneState) => (
        <>
          <section className="container">
            <div {...state.getRootProps({ className: classes.dropzone })}>
              <input {...state.getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
            <div className={classes.center}>{previews(state.acceptedFiles)}</div>
          </section>
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
