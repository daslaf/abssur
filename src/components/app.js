import { h, Component } from 'preact';
import { Router } from 'preact-router';
import LiquidRoute, { FadeAnimation } from 'liquid-route';
import 'liquid-route/style.css';

// Code-splitting is automated for routes
import Home from '../routes/home';
import ArtGallery from '../routes/art-gallery';

import Header from './header';
import Footer from './footer';

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

  handleRouteChange = e => {
    console.log('route change', e);
  }

  render(props, { locale }) {
    return (
      <div id="app">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <Locale.Provider value={locale}>
          <Translations.Provider value={TOKENS[locale]}>
            <Header
              onChangeLang={this.handleChangeLang}
              locale={locale}
            />
            <div id="wrapper">
              <Router onChange={this.handleRouteChange}>
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
              </Router>
            </div>
            <Footer />
          </Translations.Provider>
        </Locale.Provider>
      </div>
    );
  }
}
