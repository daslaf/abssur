import { h } from 'preact';
import { Link } from 'preact-router/match';

import style from './style';

const Logo = () => (
  <Link
    href="/"
    class={style.logo}
  >
    <h1 style={{ backgroundImage: 'url(/assets/img/logo-black.png)' }}>
      <span hidden>Abstracción Sur</span>
    </h1>
  </Link>
);

const Header = () => (
  <header class={style.header}>
    <nav>
      <Logo />
    </nav>
  </header>
);

export default Header;
