import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import LiquidRoute, { FadeAnimation } from 'liquid-route';
import 'liquid-route/style.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import ArtGallery from '../routes/art-gallery';
import About from '../routes/about';
import Expo from '../routes/expo';

import Loading from './loading';

import Locale from '../context/lang';
import Translations from '../context/translations';
import { ES_CL } from '../utils/locale';
import { getArtists } from '../model/artist';

import TOKENS from '../translations';

export default class App extends Component {
  state = {
    activeArtist: null,
    artists: [],
    loading: false,
    locale: ES_CL
  }

  // Network
  getArtists = () => {
    const { artists } = this.state;
    
    if (artists.length === 0) {
      this.setState({ loading: true });

      return getArtists();
    }

    return Promise.resolve(artists);
  };

  // Handlers
  handleChangeLang = locale => () => {
    this.setState({ locale });
  }

  handlePreloadFinish = () => {
    this.setState({ loading: false });
  }

  handleRouteChange = (event) => {
    const matches = (/^\/gallery\/.*/g).test(event.url);

    if (matches) {
      const { id } = event.current.attributes.matches;

      this.getArtists().then((artists) => {
        const activeArtist = artists.find(a => {
          const slug = a.slug[Object.keys(a.slug)[0]];
  
          return slug === id;
        });
  
        if (!activeArtist) {
          route('/', true);
        }
        else {
          this.setState({ activeArtist });
        }
      });
    }
  }

  // Lifecycle
  componentDidMount() {
    this.getArtists().then(artists => {
      this.setState({ artists });
    });
  }

  // Render
  render(props, state) {
    const { activeArtist, artists, loading, locale } = state;

    return (
      <div id="app">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Locale.Provider value={locale}>
          <Translations.Provider value={TOKENS[locale]}>
            <Loading
              in={loading}
            />
            <Router onChange={this.handleRouteChange}>
              <LiquidRoute
                animator={FadeAnimation}
                artists={artists}
                component={Home}
                onPreload={this.handlePreloadFinish}
                path="/"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={ArtGallery}
                activeArtist={activeArtist}
                onChangeLang={this.handleChangeLang}
                onPreload={this.handlePreloadFinish}
                path="/gallery/:id"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={About}
                onChangeLang={this.handleChangeLang}
                onPreload={this.handlePreloadFinish}
                path="/about"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={Expo}
                onChangeLang={this.handleChangeLang}
                onPreload={this.handlePreloadFinish}
                path="/expo"
              />
            </Router>
          </Translations.Provider>
        </Locale.Provider>
      </div>
    );
  }
}
