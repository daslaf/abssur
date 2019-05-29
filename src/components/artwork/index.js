import { withLocale } from '../../utils/locale';

const Artwork = ({
  children,
  collection,
  format,
  image,
  name,
  pluck,
  technique,
  thumbnail,
  year
}) => children[0]({
  collection: collection ? pluck(collection) : null,
  format: format ? pluck(format) : null,
  image: {
    alt: pluck(pluck(image).fields.title),
    src: pluck(pluck(image).fields.file).url
  },
  name: pluck(name),
  technique: technique ? pluck(technique) : null,
  thumbnail: {
    alt: pluck(pluck(thumbnail).fields.title),
    src: pluck(pluck(thumbnail).fields.file).url
  },
  year: year ? pluck(year) : null
});

export default withLocale(Artwork);
