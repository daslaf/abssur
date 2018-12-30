import { h } from 'preact';
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
    <div
      className={style.artist + ' ' + className}
      style={{
        backgroundImage: `url(${image.fields.file.url})`
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={style.mainArtwork}
        style={{
          backgroundImage: `url(${mainArtwork.fields.file.url})`
        }}
      />
      <h1 className={style.name}>{name} <b>{surname}</b></h1>
    </div>
  );
};

export default Artist;
