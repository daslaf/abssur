import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style.css';

import Translations from '../../context/translations';

const Footer = () => (
  <footer class={style.footer}>
    <Translations.Consumer>
      {tokens => (
        <nav class={style.nav}>
          <Link class={style.link} href="/">Inicio</Link>
          <Link class={style.link} href="/">Galería</Link>
          <Link class={style.link} href="/">Equipo</Link>
        </nav>
      )}
    </Translations.Consumer>
  </footer>
);

export default Footer;
