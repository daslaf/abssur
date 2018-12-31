import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
  <header class={style.header}>
    <nav>
      <Link
        href="/"
      >
        <img
          class={style.logo}
          alt="logo"
          src="../../../assets/img/logo-32.png"
        />
      </Link>
    </nav>
  </header>
);

export default Header;
