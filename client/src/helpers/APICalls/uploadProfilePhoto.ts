import { FetchOptions } from '../../interface/FetchOptions';

interface ImageData {
  success: { imageURI: string };
  error: { message: string };
}

const uploadProfilePhoto = async (images: Array<File>): Promise<ImageData> => {
  const form_data = new FormData();

  for (const image of images) {
    form_data.append('images', image);
  }

  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    body: form_data,
  };

  return await fetch(`/image-upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadProfilePhoto;
