import { h, Component } from 'preact';

import Artist from '../artist';
import css from './style';

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
      <div class={css.wrapper}>
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
        </div>
      </div>
    );
  }
}

export default Artists;
