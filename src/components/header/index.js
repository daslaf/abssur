import { h } from 'preact';
import { Link } from 'preact-router/match';

import Locale from '../../context/lang';
import { EN_US, ES_CL } from '../../utils/locale';

import style from './style';

const Logo = () => (
  <Link href="/" class={style.logo}>
    <h1>
      Abstracción <strong><span>S</span>ur</strong>
    </h1>
  </Link>
);

const Header = ({ onChangeLang }) => (
  <Locale.Consumer>
    {locale => (
      <header class={style.header}>
        <nav>
          <Logo />
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
    )}
  </Locale.Consumer>
);

export default Header;
