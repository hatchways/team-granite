import { FetchOptions } from '../../interface/FetchOptions';
import { User } from '../../interface/User';
import { ErrorJson } from '../../interface/Error';

interface ImageSourceData {
  imageSource: string;
}

const getImageSource = async (user: User): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
    credentials: 'include',
  };
  return await fetch(`/getImageSource`, fetchOptions)
    .then((): ImageSourceData => ({ imageSource: '' }))
    .catch(
      (): ErrorJson => ({
        error: { message: 'Unable to connect to server. Please try again' },
      }),
    );
};

export default getImageSource;
