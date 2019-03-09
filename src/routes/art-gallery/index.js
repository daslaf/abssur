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
        <Header />
        <div>Video</div>
      </div>
    );
  }
}

export default ArtistPage;
