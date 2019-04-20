import { h, Component, createRef } from 'preact';
import Portal from 'preact-portal';

import css from './style.css';

import Device from '../../context/device';
import Artwork from '../artwork';
import Slider, { Controls, Wrapper } from '../slider';
import { DisplayStatus, getClass } from './utils';

class GalleryModal extends Component {
  state = {
    status: '',
    activeSlideData: null
  };

  sliderRef = createRef();

  handleKeyUp = (e) => {
    switch (e.which) {
    case 27: // esc
      this.exitModal();
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

  handleSlideChange = data => {
    const { artworks } = this.props;

    this.setState({
      activeSlideData: artworks[data.current]
    });
  }

  getClassList = base => {
    const { status } = this.state;

    const className = getClass(status, base);
    const baseClasses = `${css[base]} ${css[base + 'Transition']}`;

    return className
      ? `${baseClasses} ${css[className]}`
      : baseClasses;
  }

  removeListeners = () => {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  registerListeners = () => {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  schedule = (status, time = 0, callback) => {
    let handler = setTimeout(() => {
      this.setState({ status });

      if (typeof callback === 'function') {
        callback();
      }

      clearTimeout(handler);
    }, time);
  }

  enterModal = () => {
    this.schedule(DisplayStatus.Exited);
    this.schedule(DisplayStatus.Entering, 32);
    this.schedule(DisplayStatus.Entered, 275, this.registerListeners);
  }

  exitModal = () => {
    this.schedule(DisplayStatus.Entered, 0, this.removeListeners);
    this.schedule(DisplayStatus.Exiting, 32);
    this.schedule(DisplayStatus.Exited, 275, this.props.onHide);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.in && this.props.in) {
      this.enterModal();
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  renderContent = (props, state) => {
    const { activeArtwork, artworks } = props;
    const { activeSlideData, status } = state;

    const modalClassList = this.getClassList('modal');
    const modalContentClassList = this.getClassList('modalContent');

    return (
      <div class={modalClassList}>
        <div class={modalContentClassList}>
          {status === DisplayStatus.Entered && (
            <Slider
              ref={this.sliderRef}
              style="height: 100%"
              onChange={this.handleSlideChange}
              start={activeArtwork}
              slides={artworks}
            >
              <Wrapper>
                {slide => (
                  <Artwork {...slide.data}>
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
                {({ isFirst, isLast, next, previous }) => (
                  <div class={css.controls}>
                    <button
                      className={css.controlsPrevious}
                      onClick={previous}
                      disabled={isFirst}
                    >
                      <i class="material-icons">keyboard_arrow_left</i>
                    </button>
                    <button
                      className={css.controlsNext}
                      onClick={next}
                      disabled={isLast}
                    >
                      <i class="material-icons">keyboard_arrow_right</i>
                    </button>
                  </div>
                )}
              </Controls>
            </Slider>
          )}
          <Device.Consumer>
            {({ userCanHover }) => (!userCanHover && activeSlideData
              ? (
                <Artwork {...activeSlideData}>
                  {({ name, year }) => (
                    <div class={css.activeSlideData}>
                      <p class={css.activeSlideDataContent}>
                        {name} - {year}
                      </p>
                    </div>
                  )}
                </Artwork>
              )
              : null
            )}
          </Device.Consumer>
          <button
            class={css.dismiss}
            onClick={this.exitModal}
          >
            <i class="material-icons">clear</i>
          </button>
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
