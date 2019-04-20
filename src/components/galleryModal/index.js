import { h, Component, createRef } from 'preact';
import Portal from 'preact-portal';

import css from './style.css';

import Artwork from '../artwork';
import Slider, { Controls, Wrapper } from '../slider';
import { DisplayStatus, getClass } from './utils';

class GalleryModal extends Component {
  state = {
    status: ''
  };

  sliderRef = createRef();

  handleKeyUp = (e) => {
    switch (e.which) {
    case 27: // esc
      break;
    case 37: // back
      this.sliderRef.current.previousSlide();
      break;
    case 39: // forward
      this.sliderRef.current.nextSlide();
      break;
    default:
      break;
    }
  };

  dismiss = () => {
    console.log('dismiss modal');
  }

  getClassList = base => {
    const { status } = this.state;

    const className = getClass(status, base);
    const baseClasses = `${css[base]} ${css[base + 'Transition']}`;

    return className
      ? `${baseClasses} ${css[className]}`
      : baseClasses;
  }

  registerListeners = () => {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  schedule = (status, time = 0) => {
    let handler = setTimeout(() => {
      this.setState({ status });

      clearTimeout(handler);
    }, time);
  }

  startRendering = () => {
    this.schedule(DisplayStatus.Exited);
    this.schedule(DisplayStatus.Entering, 32);
    this.schedule(DisplayStatus.Entered, 275);

    this.registerListeners();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.in && this.props.in) {
      this.startRendering();
    }
  }

  renderContent = (props, state) => {
    const { activeArtwork, artworks } = props;
    const { status } = state;

    const modalClassList = this.getClassList('modal');
    const modalContentClassList = this.getClassList('modalContent');

    return (
      <div class={modalClassList}>
        <div class={modalContentClassList}>
          {status === DisplayStatus.Entered && (
            <Slider
              ref={this.sliderRef}
              style="height: 100%"
              // onChange={what => console.log('slider on change', what)}
              start={activeArtwork}
              slides={artworks}
            >
              <Wrapper>
                {({ data, index }) => (
                  <Artwork {...data}>
                    {({ image }) => (
                      <div class={css.slide}>
                        <figure
                          role="image"
                          title={image.alt}
                          alt={image.alt}
                          style={{ backgroundImage: `url(${image.src})` }}
                        />
                      </div>
                    )}
                  </Artwork>
                )}
              </Wrapper>
              <Controls>
                {({ current, total, next, previous }) => (
                  <div class={css.controls}>
                    <button
                      className={css.controlsPrevious}
                      onClick={previous}
                    >
                      <i class="material-icons">keyboard_arrow_left</i>
                    </button>
                    <span>{current + 1} out of {total}</span>
                    <button
                      className={css.controlsNext}
                      onClick={next}
                    >
                      <i class="material-icons">keyboard_arrow_right</i>
                    </button>
                  </div>
                )}
              </Controls>

              <h1>hey</h1>
            </Slider>
          )}
        </div>
      </div>
    );
  }

  render(props, state) {
    const { status } = state;

    return (
      <Portal into="body">
        {status !== DisplayStatus.Exited && status !== ''
          ? this.renderContent(props, state)
          : null
        }
      </Portal>
    );
  }
}

export default GalleryModal;
