import { getEntries } from '../../utils/contentful.provider';

export const getArtists = () =>
  getEntries({
    content_type: 'artist',
    include: 1
  }).then(res => res.items.map(i => i.fields));
