import { h } from 'preact';
import style from './style';

const Artist = ({ name, img }) => (
  <div className={style.artist} style={{
    backgroundImage: `url(${img})`
  }}
  >
    <h1>{name}</h1>
  </div>
);

export default Artist;