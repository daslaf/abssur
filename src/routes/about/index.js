import { h } from 'preact';
import css from './style';

import Header from '../../components/header';
import Translations from '../../context/translations';

const About = (props) => (
  <Translations.Consumer>
    {TOKENS => (
      <div>
        <Header onChangeLang={props.onChangeLang} />
        <div class={`container ${css.container}`}>
          <section class={css.presentation}>
            <h2 class={css.title}>{TOKENS.INTRODUCTION}</h2>

            <p>{TOKENS.ABOUT_PROJECT_1}</p>
            <p>{TOKENS.ABOUT_PROJECT_2}</p>
            <p>{TOKENS.ABOUT_PROJECT_3}</p>
            <p>{TOKENS.ABOUT_PROJECT_4}</p>
          </section>

          <aside class={css.team}>
            <dl>
              <dt>{TOKENS.TEAM_DIRECTOR}</dt>
              <dd>Ramón Castillo</dd>

              <dt>{TOKENS.TEAM_PRODUCTION}</dt>
              <dd>Olivia Guasch</dd>
            </dl>

            <h2 class={css.title}>{TOKENS.TEAM}</h2>

            <dl>
              <dt>{TOKENS.TEAM_CAMERA}</dt>
              <dd>Rodrigo Avilés y Juan Millán</dd>

              <dt>{TOKENS.TEAM_EDITION}</dt>
              <dd>Manuela Piña</dd>

              <dt>{TOKENS.TEAM_PROGRAMMING}</dt>
              <dd>Osman Cea</dd>

              <dt>{TOKENS.TEAM_SOUND}</dt>
              <dd>Carlos Arias</dd>

              <dt>{TOKENS.TEAM_MUSIC}</dt>
              <dd>Rodrigo "Chino" Aros</dd>

              <dt>{TOKENS.TEAM_DESIGN}</dt>
              <dd>Micchela Messone</dd>
            </dl>
          </aside>
        </div>

        <div class={`container ${css.container}`}>
          <section class={css.presentation}>
            <h2 class={css.title} style={{ marginTop: 80 }}>{TOKENS.FINANCED_BY}</h2>

            <img
              class={css.fondart}
              src="assets/img/fondart.png"
              alt="Logo Fondart"
            />
          </section>
        </div>
      </div>
    )}
  </Translations.Consumer>
);

export default About;
