import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
  imageSource: string;
  handleClick: () => void;
}

const AvatarDisplay = ({ imageSource, handleClick }: Props): JSX.Element => {
  return <Avatar onClick={handleClick} alt="Profile Image" src={imageSource} />;
};

export default AvatarDisplay;
