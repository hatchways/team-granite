import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiDataSuccess } from '../../interface/AuthApiData';

interface UpdateProfileData {
  success?: AuthApiDataSuccess;
  error?: string;
  errors?: string[];
}

const updateProfile = async (newUsername: string, newEmail: string): Promise<UpdateProfileData> => {
  console.log(JSON.stringify({ newUsername, newEmail }));
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newUsername, newEmail }),
  };
  return await fetch(`/users`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfile;
