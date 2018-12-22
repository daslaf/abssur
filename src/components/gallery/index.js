import { h } from 'preact';
import style from './style';

const Gallery = ({ children, source }) => (
  <div className={style.grid}>
    {source.map(item => (
      <div className={style.item}>
        <div className={style.content}>
          {children[0]({ data: item })}
        </div>
      </div>
    ))}
  </div>
);

export default Gallery;
