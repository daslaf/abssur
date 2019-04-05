import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import LiquidRoute, { FadeAnimation } from 'liquid-route';
import 'liquid-route/style.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import ArtGallery from '../routes/art-gallery';
import About from '../routes/about';

import Locale from '../context/lang';
import Translations from '../context/translations';
import { ES_CL } from '../utils/locale';
import { getArtists } from '../model/artist';

import TOKENS from '../translations';

export default class App extends Component {
  state = {
    activeArtist: null,
    artists: [],
    locale: ES_CL
  }

  // Network
  getArtists = () => {
    const { artists } = this.state;
    
    if (artists.length === 0) {
      return getArtists();
    }

    return Promise.resolve(artists);
  };

  // Handlers
  handleChangeLang = locale => (event) => {
    this.setState({ locale });
  }

  handleRouteChange = (event) => {
    const matches = (/^\/gallery\/.*/g).test(event.url);

    if (matches) {
      const { id } = event.current.attributes.matches;

      this.getArtists().then(
        artists => {
          const activeArtist = artists.find(a => {
            const [ slug ] = Object.values(a.slug);
    
            return slug === id;
          });
    
          if (!activeArtist) {
            route('/', true);
          }
          else {
            this.setState({ activeArtist });
          }
        }
      )
    }
  }

  // Lifecycle
  componentDidMount() {
    this.getArtists().then(artists => {
      this.setState({ artists });
    });
  }

  // Render
  render(props, { activeArtist, artists, locale }) {
    return (
      <div id="app">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Locale.Provider value={locale}>
          <Translations.Provider value={TOKENS[locale]}>
            <Router onChange={this.handleRouteChange}>
              <LiquidRoute
                animator={FadeAnimation}
                artists={artists}
                component={Home}
                path="/"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={ArtGallery}
                activeArtist={activeArtist}
                onChangeLang={this.handleChangeLang}
                path="/gallery/:id"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={About}
                onChangeLang={this.handleChangeLang}
                path="/about"
              />
            </Router>
          </Translations.Provider>
        </Locale.Provider>
      </div>
    );
  }
}
