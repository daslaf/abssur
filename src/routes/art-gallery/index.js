import { h, Component } from 'preact';

// import Artwork from '../../components/artwork';
import Header from '../../components/header';
import { getArtworksByArtist } from '../../model/artwork';

class ArtistPage extends Component {
  state = {
    artworks: [],
    fetchingArtworks: false
  }

  getArtworks = (id) => {
    this.setState({
      fetchingArtworks: true
    });

    getArtworksByArtist(id).then((artworks) => {
      this.setState({ artworks });
    });
  }

  componentDidMount() {
    // const { id } = this.props.matches;
    // this.getArtworks(id);
  }

  render(props, { artworks }) {
    return (
      <div>
        <Header onChangeLang={props.onChangeLang} />
        <div>Video</div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/fuUhYr64Pqw?controls=0&showInfo=0"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    );
  }
}

export default ArtistPage;
