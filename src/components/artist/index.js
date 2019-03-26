import { h } from 'preact';
import { Link } from 'preact-router/match';

import { withLocale } from '../../utils/locale';

import style from './style';

const Artist = ({
  active,
  name,
  surname,
  id,
  image,
  mainArtwork,
  pluck,
  slug,
  onMouseEnter,
  onMouseLeave
}) => {
  const isActive = active === id;
  const className = active === null
    ? ''
    : isActive ? style.artistActive : style.artistBlurred;
  const classList = style.artist + ' ' + className;

  return (
    <Link
      href={`/gallery/${pluck(slug)}`}
      class={classList}
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
        {pluck(name)} <strong>{pluck(surname)}</strong>
      </h1>
    </Link>
  );
};

export default withLocale(Artist);
