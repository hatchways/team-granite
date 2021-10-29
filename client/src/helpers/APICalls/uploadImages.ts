import { FetchOptions } from '../../interface/FetchOptions';
import { ErrorJson } from '../../interface/Error';

interface ImageData {
  imageURIs?: Array<string>;
}

const uploadImages = async (images: Array<File>): Promise<any> => {
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
    .then(
      (): ImageData => ({
        imageURIs: [''],
      }),
    )
    .catch(
      (): ErrorJson => ({
        error: { message: 'Unable to connect to server. Please try again' },
      }),
    );
};

export default uploadImages;
