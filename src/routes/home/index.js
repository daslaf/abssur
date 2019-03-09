import { h, Component } from 'preact';
import css from './style';

import { getArtists } from '../../model/artist';
import Artists from '../../components/artists';

class Home extends Component {
  state = {
    artists: []
  }

  getArtists = () => {
    getArtists().then(artists => {
      this.setState({ artists });
    });
  };
  
  componentDidMount() {
    this.getArtists();
  }

  render(props, { artists }) {
    return (
      <div class={css.main}>
        {artists.length
          ? <Artists artists={artists} />
          : <h1>Loading</h1>
        }
      </div>
    );
  }
}

export default Home;
