import { h, Component } from 'preact';
import { Router } from 'preact-router';
import LiquidRoute, { FadeAnimation } from 'liquid-route';
import 'liquid-route/style.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import ArtGallery from '../routes/art-gallery';
import About from '../routes/about';

// import Header from './header';

import Locale from '../context/lang';
import Translations from '../context/translations';
import { ES_CL } from '../utils/locale';

import TOKENS from '../translations';

export default class App extends Component {
  state = {
    locale: ES_CL
  }

  handleChangeLang = locale => (event) => {
    this.setState({ locale });
  }

  render(props, { locale }) {
    return (
      <div id="app">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Locale.Provider value={locale}>
          <Translations.Provider value={TOKENS[locale]}>
            <Router>
              <LiquidRoute
                animator={FadeAnimation}
                component={Home}
                path="/"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={ArtGallery}
                path="/gallery/:id"
              />
              <LiquidRoute
                animator={FadeAnimation}
                component={About}
                path="/about"
              />
            </Router>
          </Translations.Provider>
        </Locale.Provider>
      </div>
    );
  }
}
