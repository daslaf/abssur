import { h, Component } from 'preact';
import style from './style';

import { getArtists } from '../../model/artist';
import Artists from '../../components/artists';

import Translations from '../../context/translations';

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
        <div class={style.wrapper}>
          <div class={style.hero}>
            <div>
              <h1 class={style.title}>Abstracción Sur</h1>
              <Translations.Consumer>
                {messages => (
                  <p class={style.about}>{messages.HOME_ABOUT}</p>
                )}
              </Translations.Consumer>
            </div>
          </div>
        </div>

        <Artists artists={artists} />
      </div>
    );
  }
}

export default Home;
