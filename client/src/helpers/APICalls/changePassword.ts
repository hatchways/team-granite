import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const changePassword = async (oldPassword: string, newPassword: string): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword, newPassword }),
    credentials: 'include',
  };
  return await fetch(`/user`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changePassword;
