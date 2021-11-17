import { v4 as uuidv4 } from 'uuid';
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import useStyles from './useStyles';
import { IDropzoneProps } from 'react-dropzone-uploader';
import { FileMeta } from '../../../interface/FileApiData';
import FileDisplay from './FileDisplay';
import FileUpload from '../../FileUpload/FileUpload';
import Dialog from '@material-ui/core/Dialog';
import mockFiles from '../../../mocks/mockFile';

interface FileAttachProps {
  pluginId: string;
}

const FileAttach = ({ pluginId, ...props }: FileAttachProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileMeta[]>(mockFiles);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload: IDropzoneProps['onSubmit'] = () => {
    //This function will upload files and set the files state.
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2} {...props}>
      <Grid item>
        <DescriptionIcon className={classes.descriptionIcon} />
      </Grid>
      <Grid item>
        <Typography variant={'h6'} className={classes.title}>
          File Attachments:
        </Typography>
        <Grid container justify={'flex-start'} spacing={2}>
          {files.map((file: FileMeta, index: number) => {
            return <FileDisplay key={uuidv4()} file={file} allFiles={files} setFiles={setFiles} fileIndex={index} />;
          })}
          <Grid item>
            <AttachFileIcon onClick={handleClick} className={classes.hoverPointer} />
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <FileUpload handleUpload={handleUpload} />
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default FileAttach;
