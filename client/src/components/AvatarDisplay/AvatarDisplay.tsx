import Avatar from '@material-ui/core/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
  image_source: string;
  onClick: () => void;
}

const AvatarDisplay = ({ image_source, onClick }: Props): JSX.Element => {
  return <Avatar onClick={onClick} alt="Profile Image" src={image_source} />;
};

export default AvatarDisplay;
