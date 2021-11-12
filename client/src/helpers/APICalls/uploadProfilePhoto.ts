import { FetchOptions } from '../../interface/FetchOptions';
interface ImageData {
  success: { imageURI: string };
  error?: string;
  errors?: string[];
}

const uploadProfilePhoto = async (image: File): Promise<ImageData> => {
  const formData = new FormData();
  formData.append('profilePhoto', image);

  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: formData,
  };

  return await fetch(`/image/profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default uploadProfilePhoto;
