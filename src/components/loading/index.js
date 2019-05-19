import { h, Component } from 'preact';
import css from './style.css';

import { DisplayStatus, getClass } from '../../utils/transition';

class Loading extends Component {
  state = {
    status: ''
  }

  getClassList = base => {
    const { status } = this.state;

    const className = getClass(status, base);
    const baseClasses = `${css[base]} ${css[base + 'Transition']}`;

    return className
      ? `${baseClasses} ${css[className]}`
      : baseClasses;
  }

  schedule = (status, time = 0) => {
    const handler = setTimeout(() => {
      this.setState({ status });

      clearTimeout(handler);
    }, time);
  }

  show = () => {
    this.schedule(DisplayStatus.Entered);
  }

  hide = () => {
    this.schedule(DisplayStatus.Entered);
    this.schedule(DisplayStatus.Exiting, 32);
    this.schedule(DisplayStatus.Exited, 375);
  }

  componentDidMount() {
    if (this.props.in) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.in && this.props.in) {
      this.show();
    }

    if (prevProps.in && !this.props.in) {
      this.hide();
    }
  }

  renderContent = () => {
    const loadingClassList = this.getClassList('loading');

    return (
      <div class={loadingClassList}>
        <div class={css.container}>
          <h4 class={css.title}>
            <span
              class={css.glitch}
              data-text="Abstracción"
            >
              Abstracción
            </span>&nbsp;
            <span
              class={css.glitch}
              data-text="Sur"
            >
              Sur
            </span>
          </h4>
          <div class={css.ripple}>
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }

  render(props, state) {
    const { status } = state;

    return (status !== DisplayStatus.Exited && status !== ''
      ? this.renderContent()
      : null
    );
  }
}

export default Loading;
