import { withLocale } from '../../utils/locale';

const Artwork = ({
  children,
  format,
  image,
  name,
  pluck,
  technique,
  thumbnail,
  year
}) => children[0]({
  format: pluck(format),
  image: {
    alt: pluck(pluck(image).fields.title),
    src: pluck(pluck(image).fields.file).url
  },
  name: pluck(name),
  technique: pluck(technique),
  thumbnail: {
    alt: pluck(pluck(thumbnail).fields.title),
    src: pluck(pluck(thumbnail).fields.file).url
  },
  year: pluck(year)
});

export default withLocale(Artwork);
