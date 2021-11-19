import { FileMeta } from '../interface/FileApiData';

const mockFiles: FileMeta[] = [
  {
    id: '0',
    cloudinaryId: '0',
    name: 'TestFile',
    url: 'https://en.wikipedia.org/wiki/File:Test-Logo.svg',
    type: 'svg',
  },
  {
    id: '1',
    cloudinaryId: '1',
    name: 'TestFile2',
    url: 'https://en.wikipedia.org/wiki/File:Test-Logo.svg',
    type: 'pdf',
  },
  {
    id: '2',
    cloudinaryId: '2',
    name: 'TestFile',
    url: 'https://en.wikipedia.org/wiki/File:Test-Logo.svg',
    type: 'jpeg',
  },
];

export default mockFiles;
