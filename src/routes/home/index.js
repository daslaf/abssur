import { h, Component } from 'preact';
import style from './style';

import { getArtists } from '../../model/artist';
import Artists from '../../components/artists';
import Footer from '../../components/footer';
import Expo from '../../components/expo';

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
        <Expo />

        <div class={style.wrapper}>
          <div class={style.hero}>
            <div>
              <h1 class={style.logo}>
                A<br />
                BS<br />
                TRAC<br />
                CIÓN<br />
                <span class={style.backwards}>S</span>UR<br />
              </h1>
            </div>
            <div>
              <Translations.Consumer>
                {messages => (
                  <p class={style.about}>{messages.HOME_ABOUT}</p>
                )}
              </Translations.Consumer>
            </div>
          </div>
        </div>

        <Artists artists={artists} />

        <div class={style.wrapper}>
          <div class={style.hero}>
            <div>
              <h1 class={style.logo}>
                A<br />
                BS<br />
                TRAC<br />
                CIÓN<br />
                <span class={style.backwards}>S</span>UR<br />
              </h1>
            </div>
            <div>
              <Translations.Consumer>
                {messages => (
                  <p class={style.about}>{messages.HOME_ABOUT}</p>
                )}
              </Translations.Consumer>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
