import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

import Header from './header';
import Footer from './footer';

import { ES_CL } from '../context/lang';
import Translations from '../context/translations';

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
        <Translations.Provider value={TOKENS[locale]}>
          <Header
            onChangeLang={this.handleChangeLang}
            locale={locale}
          />
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Profile path="/gallery/:id" />
          </Router>
          <Footer />
        </Translations.Provider>
      </div>
    );
  }
}
