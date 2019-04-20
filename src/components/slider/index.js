import { h, Component, cloneElement } from 'preact';
import style from './style.css';

import Controls from './controls';
import Wrapper from './wrapper';

class Slider extends Component {
  state = {
    currentSlide: this.props.start || 0,
    totalSlides: 0
  }

  onChange = () => {
    const { onChange } = this.props;
    const { currentSlide, totalSlides } = this.state;

    if (typeof onChange === 'function') {
      onChange({
        currentSlide,
        totalSlides,
        first: currentSlide === 0,
        last: currentSlide === totalSlides - 1
      });
    }
  }

  nextSlide = () => {
    const { currentSlide, totalSlides } = this.state;

    if (currentSlide < totalSlides - 1) {
      this.setState(
        { currentSlide: currentSlide + 1 },
        this.onChange
      );
    }
  }
  
  previousSlide = () => {
    const { currentSlide } = this.state;

    if (currentSlide > 0) {
      this.setState(
        { currentSlide: currentSlide - 1 },
        this.onChange
      );
    }
  }

  /*** Lifecycle ***/

  static getDerivedStateFromProps({ slides }, { totalSlides }) {
    if (slides.length !== totalSlides) {
      return {
        totalSlides: slides.length
      };
    }

    return null;
  }

  componentDidMount() {
    this.onChange();
  }

  /*** Render ***/

  render({ slides, children, ...props }, { currentSlide, totalSlides }) {
    return (
      <div
        class={style.slider}
        {...props}
      >
        {
          children.map((vNode) => {
            if (vNode.nodeName === Controls) {
              return cloneElement(vNode, {
                current: currentSlide,
                total: totalSlides,
                isFirst: currentSlide === 0,
                isLast: currentSlide === totalSlides - 1,
                next: this.nextSlide,
                previous: this.previousSlide
              });
            }
            else if (vNode.nodeName === Wrapper) {
              return cloneElement(vNode, {
                current: currentSlide,
                total: slides.length,
                slides
              });
            }
      
            return vNode;
          })
        }
      </div>
    );
  }
}

export default Slider;
export { Controls, Wrapper };
