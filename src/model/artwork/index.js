import { getEntries } from '../../utils/contentful.provider';

const getArtworks = () =>
  getEntries({
    content_type: 'artwork',
    include: 1
  }).then(res => res.items.map(i => i.fields));

const getArtworksByArtist = (slug) =>
  getEntries({
    'fields.author.sys.contentType.sys.id': 'artist',
    'fields.author.fields.slug': slug,
    content_type: 'artwork',
    include: 1
  }).then(res => res.items.map(i => i.fields));

export {
  getArtworks,
  getArtworksByArtist
};
