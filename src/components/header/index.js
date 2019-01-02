import { h } from 'preact';
import { Link } from 'preact-router/match';

import { EN_US, ES_CL } from '../../context/lang';

import style from './style';

const Header = ({ locale, onChangeLang }) => (
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
    <div>
      <button
        class={locale === ES_CL ? style.buttonActive : style.button}
        onClick={onChangeLang(ES_CL)}
      >
        Español
      </button>
      <button
        class={locale === EN_US ? style.buttonActive : style.button}
        onClick={onChangeLang(EN_US)}
      >
        English
      </button>
    </div>
  </header>
);

export default Header;
