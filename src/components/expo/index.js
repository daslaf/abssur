import { h, Component } from 'preact';
import { randomNumber } from '../../utils/random';
import style from './style.css';

class Expo extends Component {
  state = {
    imgs: [
      '../../../assets/img/exp1.png',
      '../../../assets/img/exp2.png',
      '../../../assets/img/exp3.png',
      '../../../assets/img/exp4.png',
      '../../../assets/img/exp5.png',
      '../../../assets/img/exp6.png'
    ],
    active: randomNumber(5, 0)
  };

  componentDidMount() {
    const { interval = 7500 } = this.props;

    this.handler = setInterval(() => {
      this.setState(previous => ({
        active: previous.active + 1
      }));
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.handler);
  }

  render(props, { active, imgs }) {
    const index = active % imgs.length;

    return (
      <section
        class={style.expo}
        style={{ backgroundImage: `url(${imgs[index]})` }}
      >
        <div class={style.veil}>
          <h1 class={style.title}>Laborum ad ea veniam aliquip eiusmod reprehenderit esse. Ex aliqua reprehenderit Lorem voluptate ex culpa. Proident ipsum anim proident consequat sunt do duis esse dolor eiusmod.</h1>
        </div>
      </section>
    );
  }
}

export default Expo;
