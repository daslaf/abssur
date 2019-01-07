import { h, Component, cloneElement } from 'preact';
import style from './style.css';

import Controls from './controls';
import Wrapper from './wrapper';

class Slider extends Component {
  state = {
    currentSlide: 0,
    totalSlides: 0
  }

  onChange = () => {
    const { onChange } = this.props;
    const { currentSlide, totalSlides } = this.state;

    onChange({
      currentSlide,
      totalSlides,
      first: currentSlide === 0,
      last: currentSlide === totalSlides - 1
    });
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

  static getDerivedStateFromProps({ source }, { totalSlides }) {
    if (source.length !== totalSlides) {
      return {
        totalSlides: source.length
      };
    }

    return null;
  }

  componentDidMount() {
    this.onChange();
  }

  /*** Render ***/

  render({ source, children }, { currentSlide, totalSlides }) {
    return (
      <div class={style.slider}>
        {
          children.map((vNode) => {
            if (vNode.nodeName === Controls) {
              return cloneElement(vNode, {
                currentSlide,
                totalSlides,
                nextSlide: this.nextSlide,
                previousSlide: this.previousSlide
              });
            }
            else if (vNode.nodeName === Wrapper) {
              return cloneElement(vNode, {
                currentSlide,
                totalSlides,
                source
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
