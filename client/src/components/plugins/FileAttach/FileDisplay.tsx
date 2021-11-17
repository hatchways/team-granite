import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { FileMeta } from '../../../interface/FileApiData';
import { useState } from 'react';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';

interface FileDisplayProps {
  file: FileMeta;
  allFiles: FileMeta[];
  setFiles: (files: FileMeta[]) => void;
  fileIndex: number;
}

const FileDisplay = ({ file, allFiles, setFiles, fileIndex }: FileDisplayProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const updatedFiles = Array.from(allFiles);
    updatedFiles.splice(fileIndex, 1);
    setFiles(updatedFiles);
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Grid item>
      <a href={file.url} download>
        <CloudDownloadIcon />
      </a>
      <Typography>
        {file.name}
        {'.' + file.type}
      </Typography>
      <DeleteIcon onClick={handleClick} className={classes.hoverPointer} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>Please confirm to delete file</DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FileDisplay;
