import { FetchOptions } from '../../interface/FetchOptions';
import { AuthApiDataSuccess } from '../../interface/AuthApiData';

interface UpdateProfileData {
  success: AuthApiDataSuccess;
  error: {
    message: string;
  };
}

export async function updateProfile(
  new_username: string,
  new_email: string,
  new_password: string,
): Promise<UpdateProfileData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    body: JSON.stringify({ new_username, new_email, new_password }),
  };
  return await fetch(`/update_user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}