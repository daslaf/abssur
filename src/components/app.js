import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

import Header from './header';
import Footer from './footer';

export default class App extends Component {
    
  /** Gets fired when the route changes.
   *  @param {Object} event   "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/gallery/:id" />
        </Router>
        <Footer />
      </div>
    );
  }
}
