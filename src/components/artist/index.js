import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style';

const Artist = ({
  active,
  name,
  surname,
  id,
  image,
  mainArtwork,
  onMouseEnter,
  onMouseLeave
}) => {
  const isActive = active === id;
  const className = active === null
    ? ''
    : isActive ? style.artistActive : style.artistBlurred;

  return (
    <Link
      href={`/gallery/${id}`}
      class={style.artist + ' ' + className}
      style={{
        backgroundImage: `url(${image.fields.file.url})`
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        class={style.mainArtwork}
        style={{
          backgroundImage: `url(${mainArtwork.fields.file.url})`
        }}
      />
      <h1 class={style.name}>{name} <b>{surname}</b></h1>
    </Link>
  );
};

export default Artist;
