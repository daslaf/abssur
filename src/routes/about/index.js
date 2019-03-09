import { h, Component } from 'preact';
import css from './style';

class About extends Component {
  state = {
    artists: []
  }

  render(props, { artists }) {
    return (
      <div class={css.container}>
        <section class={css.presentation}>
          <h2 class={css.title}>Presentación</h2>

          <p>Este sitio web despliega la obra de 12 artistas que, de manera colectiva o individual, desarrollaron en Chile, entre 1955 y la actualidad, una visualizad abstracta en sus distintas variantes: geométrica, constructiva, óptica y cinética. Muchos de ellos pertenecieron al Movimiento Forma y Espacio, agrupación continuadora de la abstracción constructiva y geométrica del Grupo Rectángulo.</p>
          <p>Hubo varios factores que influyeron y facilitaron el surgimiento de esta escena de vanguardia tanto a nivel de estudiantes formo de profesores: crisis y renovación de la enseñanza universitaria (1930, 1945 y 1970); información, intercambios y viajes a Europa y Estados Unidos de los artistas chilenos; llegada de exposiciones internacionales (De Manera a nuestros días en 1950 y De Cezanne a Miró en 1968, entre otras), y residencias temporales o permanentes de artistas y teóricos extranjeros en nuestro país.</p>
          <p>En medio de este contexto creativo, durante varias décadas los artistas chilenos permanecieron en el silencio, rumor y rigor de largas jornadas creativas en las aulas universitarias y en sus talleres, y no siempre fueron suficientemente comprendidos y valorados a nivel de la crítica oficial, el público, las instituciones y los coleccionistas. Hubo obras, manifiestos, exposiciones en Chile, intercambios con Argentina, Uruguay y Brasil, y sin embargo, quedaron circunscritas a un circuito especializado del arte. Las obras no tuvieron espectadores en su tiempo histórico, y por consiguiente, tardaron muchos años en ser conocidas.</p>
          <p>Abstracción Sur propone desde la actualidad, dar visibilidad, no sólo a una galería de autores, obras y de espacios de diversos formatos y escalas, sino que es una invitación a conocer desde el propio taller del artista, desde su propia voz, los procesos materiales y el sistema de pensamiento y las poéticas en las que han permanecido realizando obras hasta nuestros días.</p>

          <h2 class={css.title} style={{ marginTop: 80 }}>Financiado por</h2>

          <img
            class={css.fondart}
            src="assets/img/fondart.png"
            alt="Logo Fondart"
          />

        </section>

        <aside class={css.team}>
          <dl>
            <dt>Director</dt>
            <dd>Ramón Castillo</dd>

            <dt>Producción e investigación</dt>
            <dd>Olivia Guasch</dd>
          </dl>

          <h2 class={css.title}>Equipo</h2>

          <dl>
            <dt>Cámara</dt>
            <dd>Rodrigo Avilés y Juan Millán</dd>

            <dt>Edición y Montaje</dt>
            <dd>Manuela Piña</dd>

            <dt>Programación</dt>
            <dd>Osman Cea</dd>

            <dt>Sonido y Postproducción de Audio</dt>
            <dd>Carlos Arias</dd>

            <dt>Música</dt>
            <dd>Rodrigo "Chino" Aros</dd>

            <dt>Diseño Gráfico</dt>
            <dd>Micchela Messone</dd>
          </dl>
        </aside>
      </div>
    );
  }
}

export default About;
