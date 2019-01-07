import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style.css';

import Translations from '../../context/translations';

const Footer = () => (
  <footer class={style.footer}>
    <Translations.Consumer>
      {tokens => (
        <nav class={style.nav}>
          <Link class={style.link} href="/">{tokens.NAV_HOME}</Link>
          <Link class={style.link} href="/">{tokens.NAV_GALLERY}</Link>
          <Link class={style.link} href="/">{tokens.NAV_TEAM}</Link>
        </nav>
      )}
    </Translations.Consumer>
  </footer>
);

export default Footer;
