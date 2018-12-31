import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style.css';

const Footer = () => (
  <footer class={style.footer}>
    <nav class={style.nav}>
      <Link class={style.link} href="/">Inicio</Link>
      <Link class={style.link} href="/">Galería</Link>
      <Link class={style.link} href="/">Equipo</Link>
      <Link class={style.link} href="/">Whatever</Link>
    </nav>
  </footer>
);

export default Footer;
