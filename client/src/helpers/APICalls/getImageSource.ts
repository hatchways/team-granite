import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';

interface ImageSourceData {
  success: { imageSource: string };
  error: { message: string };
}

const getImageSource = async (user: User): Promise<ImageSourceData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
    credentials: 'include',
  };
  return await fetch(`/image/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getImageSource;
