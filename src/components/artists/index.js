import { h, Component } from 'preact';

import Artist from '../artist';
import css from './style';

const Logo = () => (
  <div class={css.logo}>
    <span>S</span>ur
  </div>
);

class Artists extends Component {
  state = {
    active: null
  }

  handleMouseEnter = id => (e) => {
    this.setState({ active: id });
  }
  
  handleMouseLeave = (e) => {
    this.setState({ active: null });
  }

  render({ artists }, { active }) {
    return (
      <div class={css.grid}>
        {artists.map((item, index) => (
          <div class={`${css.item} item--${index}`}>
            <div class={css.content}>
              <Artist
                active={active}
                onMouseEnter={this.handleMouseEnter(item.id)}
                onMouseLeave={this.handleMouseLeave}
                {...item}
              />
            </div>
          </div>
        ))}
        <Logo />
      </div>
    );
  }
}


export default Artists;
