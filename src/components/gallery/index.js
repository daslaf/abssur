import { h } from 'preact';
import css from './style';

const Gallery = ({ children, source, style }) => {
  const [ first, ...rest ] = children;

  return (
    <div className={css.grid} style={style}>
      {source.map(item => (
        <div className={css.item}>
          <div className={css.content}>
            {first({ data: item })}
          </div>
        </div>
      ))}
      {rest}
    </div>
  );
};

export default Gallery;
