/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Dropzone, { DropzoneState } from 'react-dropzone';
import useStyles from './useStyles';

interface Props {
  handleUpload: (files: File[]) => void;
}

//lift up the state

const ImageUpload = ({ handleUpload }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Dropzone onDrop={(files) => console.log(files)}>
      {(state: DropzoneState) => (
        <section className="container">
          <div {...state.getRootProps({ className: 'dropzone' })}>
            <input {...state.getInputProps()} />
            <p>Drag &#39n&#39 drop some files here, or click to select files</p>
          </div>
          <button
            onClick={() => {
              handleUpload(state.acceptedFiles);
            }}
          >
            Change or Add Image
          </button>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
