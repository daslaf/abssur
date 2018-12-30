import { h, Component } from 'preact';
import style from './style';
import contentful from '../../utils/contentful.provider';

import Artists from '../../components/artists';

class Home extends Component {
  state = {
    artists: []
  }

  getArtistsData = () => contentful.getEntries({
    content_type: 'artist',
    include: 1
  }).then(res => res.items.map(i => i.fields));
  
  componentDidMount() {
    this.getArtistsData().then(artists => {
      this.setState({ artists });
    });
  }

  render(props, { artists }) {
    return (
      <div class={style.home}>
        <Artists artists={artists} />
      </div>
    );
  }
}

export default Home;
