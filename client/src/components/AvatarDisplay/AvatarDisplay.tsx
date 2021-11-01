import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
  imageSource: string | null;
  handleClick: () => void;
}

const AvatarDisplay = ({ imageSource, handleClick }: Props): JSX.Element => {
  if (!imageSource) {
    imageSource = '';
  }
  return <Avatar onClick={handleClick} alt="Profile Image" src={imageSource} />;
};

export default AvatarDisplay;
