import { h } from 'preact';
import { Link } from 'preact-router/match';

import { withLocale } from '../../utils/locale';

import style from './style';

const Artist = ({
  name,
  surname,
  image,
  mainArtwork,
  pluck,
  slug,
  onMouseEnter,
  onMouseLeave
}) => (
  <Link
    href={`/gallery/${pluck(slug)}`}
    class={style.artist}
    style={{
      backgroundImage: `url(${pluck(pluck(image).fields.file).url})`
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div
      class={style.mainArtwork}
      style={{
        backgroundImage: `url(${pluck(pluck(mainArtwork).fields.file).url})`
      }}
    />
    <h1 class={style.name}>
      <span>{pluck(name)}</span>
      <strong>{pluck(surname)}</strong>
    </h1>
  </Link>
);

export default withLocale(Artist);
