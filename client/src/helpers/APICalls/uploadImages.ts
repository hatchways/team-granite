import { FetchOptions } from '../../interface/FetchOptions';
import { SearchUsersApiData } from '../../interface/User';

interface DataData {
  success?: string;
}

export async function uploadImages(images: Array<File>): Promise<DataData> {
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
}
