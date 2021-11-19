import { FetchOptions } from '../../interface/FetchOptions';

interface ImageSourceData {
  success: { imageURI: string };
  error: { message: string };
}

const getProfilePhotoURI = async (): Promise<ImageSourceData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/users/profile-photo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfilePhotoURI;
