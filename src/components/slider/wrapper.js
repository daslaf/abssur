import { h } from 'preact';
import style from './style.css';

const Wrapper = ({ children, currentSlide, totalSlides, source }) => (
  <div class={style.container}>
    <div
      class={style.wrapper}
      style={{
        width: `${100 * totalSlides}%`,
        transform: `translateX(-${ (100 * currentSlide) / totalSlides }%)`
      }}
    >
      {source.map((item, index) =>
        children[0]({
          data: item,
          index
        })
      )}
    </div>
  </div>
);

export default Wrapper;
