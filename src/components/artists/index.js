import { h, Component } from 'preact';

import Artist from '../artist';
import Gallery from '../gallery';

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
      <Gallery source={artists}>
        {({ data }) => (
          <Artist
            active={active}
            onMouseEnter={this.handleMouseEnter(data.id)}
            onMouseLeave={this.handleMouseLeave}
            {...data}
          />
        )}
      </Gallery>
    );
  }
}


export default Artists;
