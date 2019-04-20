import { h } from 'preact';
import style from './style.css';

const Wrapper = (props) => {
  const { children, current, total, slides } = props;

  return (
    <div class={style.container}>
      <div
        class={style.wrapper}
        style={{
          width: `${100 * total}%`,
          transform: `translateX(-${ (100 * current) / total }%)`
        }}
      >
        {slides.map((item, index) =>
          children[0]({
            data: item,
            index
          })
        )}
      </div>
    </div>
  );
};

export default Wrapper;
