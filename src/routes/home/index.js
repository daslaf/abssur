import { h, Component } from 'preact';
import css from './style';

import Artists from '../../components/artists';

import { preloadImages } from '../../utils/images';

class Home extends Component {
  prefecthImages = (cycle) => {
    console.log('prefetch images', cycle);
    const { artists, onPreload } = this.props;

    const portraits = artists.map(artist => artist.image['es-CL'].fields.file['es-CL'].url);
    const artworks = artists.map(artist => artist.mainArtwork['es-CL'].fields.file['es-CL'].url);

    preloadImages(portraits).then(() => {
      onPreload();

      preloadImages(artworks);
    });
  }

  componentDidMount() {
    const { artists } = this.props;

    if (artists.length !== 0) {
      this.prefecthImages('cDM');
    }
  }

  componentDidUpdate(prevProps) {
    const { artists } = this.props;

    if (prevProps.artists.length !== artists.length) {
      this.prefecthImages('cDU');
    }
  }

  render({ artists }) {
    return (
      <div class={css.main}>
        <Artists
          artists={artists}
        />
      </div>
    );
  }
}

export default Home;
