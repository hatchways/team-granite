import { ChangeEvent, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { User } from '../../interface/User';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import Search from '../Search/Search';
import AuthMenu from '../AuthMenu/AuthMenu';
import EditProfileDialog from '../EditProfilePhotoDialog/EditProfilePhotoDialog';
import uploadProfilePhoto from '../../helpers/APICalls/uploadProfilePhoto';
import getProfilePhoto from '../../helpers/APICalls/getProfilePhoto';
import { IDropzoneProps } from 'react-dropzone-uploader';
interface Props {
  loggedInUser: User;
  handleDrawerToggle?: () => void;
}

const ChatSideBanner = ({ loggedInUser }: Props): JSX.Element => {
  const [search, setSearch] = useState<string>('test');
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [imageSource, setImageSource] = useState<string | null>(null);

  const classes = useStyles();

  useEffect(() => {
    getProfilePhoto().then((data) => {
      if (data.success) {
        setImageSource(data.success.imageURI);
      }
    });
  }, [imageSource]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newChatUser) {
      setNewChatUser(null);
    }
  };

  const handleUpload: IDropzoneProps['onSubmit'] = (files) => {
    uploadProfilePhoto(files[0].file).then((data) => {
      if (data.success) {
        setImageSource(data.success.imageURI);
      }
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid className={classes.chatSideBanner}>
      <Box className={classes.userPanel}>
        <AvatarDisplay loggedIn handleClick={handleClick} user={loggedInUser} imageSource={imageSource} />
        <EditProfileDialog handleUpload={handleUpload} handleClose={handleClose} open={open} />
        <Typography className={classes.userText} variant="h5">
          {loggedInUser.username}
        </Typography>
        <AuthMenu />
      </Box>
      <Box>
        <Typography className={classes.chatTitle} variant="h5">
          Users
        </Typography>
        <Search search={search} handleChange={handleChange} />
      </Box>
    </Grid>
  );
};

export default ChatSideBanner;
