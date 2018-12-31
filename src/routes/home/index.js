import { h, Component } from 'preact';
import style from './style';

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
      <div class={style.home}>
        <div class={style.hero}>
          <h1 class={style.title}>Abstracción Sur</h1>
          <p class={style.about}>Aproximación a la visualidad, pensamiento creativo e investigación material de los que formaron parte del origen y desarrollo de la abstracción geométrica y constructiva en Chile desde la segunda mitad del siglo XX.</p>
        </div>
        <Artists artists={artists} />
      </div>
    );
  }
}

export default Home;
