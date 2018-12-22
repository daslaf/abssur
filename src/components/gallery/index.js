import { h } from 'preact';
import style from './style';

const Gallery = ({ children, source }) => {
  const [ first, ...rest ] = children;

  return (
    <div className={style.grid}>
      {source.map(item => (
        <div className={style.item}>
          <div className={style.content}>
            {first({ data: item })}
          </div>
        </div>
      ))}
      {rest}
    </div>
  );
};

export default Gallery;
