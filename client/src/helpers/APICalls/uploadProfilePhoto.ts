import { FetchOptions } from '../../interface/FetchOptions';

interface ImageData {
  success: { imageURI: string };
  error: { message: string };
}

const uploadProfilePhoto = async (image: File): Promise<ImageData> => {
  const form_data = new FormData();

  form_data.append('profilePhoto', image);

  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: form_data,
  };

  return await fetch(`/image/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadProfilePhoto;
