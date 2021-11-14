import { FetchOptions } from '../../interface/FetchOptions';

interface PasswordChangeData {
  success: string;
  error?: string;
  errors?: string[];
}

const changePassword = async (oldPassword: string, newPassword: string): Promise<PasswordChangeData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword, newPassword }),
    credentials: 'include',
  };
  return await fetch(`/auth/password`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default changePassword;
