import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiDataSuccess } from '../../interface/AuthApiData';

interface UpdateProfileData {
  success: AuthApiDataSuccess;
  error: {
    message: string;
  };
}

const updateProfile = async (newUsername: string, newEmail: string): Promise<UpdateProfileData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ newUsername, newEmail }),
  };
  return await fetch(`/users`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfile;
