import contentful from '../../utils/contentful.provider';

export const getArtists = () =>
  contentful
    .getEntries({
      content_type: 'artist',
      include: 1
    })
    .then(res => res.items.map(i => i.fields));
