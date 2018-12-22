import { h } from 'preact';
import style from './style';

const Artist = ({
  active,
  firstName,
  id,
  img,
  lastName,
  thumbnail,
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
        backgroundImage: `url(${img})`
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={style.thumbnail}
        style={{
          backgroundImage: `url(${thumbnail})`
        }}
      />
      <h1 className={style.name}>{firstName} <b>{lastName}</b></h1>
    </div>
  );
};

export default Artist;
