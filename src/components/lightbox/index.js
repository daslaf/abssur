import { h, Component, createRef } from 'preact';
import Portal from 'preact-portal';

import css from './style.css';

import { DisplayStatus, getClass } from '../../utils/transition';

class Ligthbox extends Component {
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
    default:
      break;
    }
  };

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

  removeListeners = () => {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  schedule = (status, time = 0, callback) => {
    const handler = setTimeout(() => {
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
    const { image } = props;
    const { status } = state;

    const modalClassList = this.getClassList('lightbox');
    const modalContentClassList = this.getClassList('lightboxContent');

    return (
      <div class={modalClassList}>
        <div class={modalContentClassList}>
          {status === DisplayStatus.Entered && (
            <figure
              class={css.image}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          )}
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

export default Ligthbox;
