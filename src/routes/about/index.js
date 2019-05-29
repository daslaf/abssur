import { h, Component } from 'preact';
import css from './style';

import Header from '../../components/header';

class About extends Component {
  componentDidMount() {
    const { onPreload } = this.props;

    onPreload();
  }

  render(props) {
    return (
      <div>
        <Header onChangeLang={props.onChangeLang} />
        <div class={`container ${css.container}`}>
          <section class={css.presentation} id="presentation">
            <h2 class={css.title}>Presentación</h2>

            <p>Este portal despliega a 12 artistas que de manera colectiva e individual, integrando grupos o de forma independiente, desarrollaron en Chile entre 1955 y la actualidad una visualidad abstracta en sus distintas variantes concreta, geométrica, constructiva, óptica y cinética. Algunos elaboraron su proyecto de obra de manera independiente y otros pertenecieron al <em>Movimiento Forma y Espacio</em> (1962), agrupación continuadora de la abstracción constructiva y geométrica del <em>Grupo Rectángulo</em> (1955).</p>

            <p>Hubo varios factores que provocaron una escena de vanguardia tanto a nivel de estudiantes como de profesores: crisis y renovación de la enseñanza universitaria (1930, 1945 y 1970); información, intercambios y viaje a Europa y EEUU de los artistas chilenos; la llegada de exposiciones internacionales (<em>De Manet a nuestros días</em> en 1950 y <em>De Cezanne a Miró</em> en 1968, entre otras), y la residencia temporal o permanente de artistas y teóricos extranjeros a nuestro país. Episodios culturales que fueron en cierto modo la base para que unos años después acontecieran el <em>Homenaje a Piet Mondrian</em> del año 1972 en el MNBA, las intervenciones artísticas del edificio UNCTAD III, el Mural cerámico del Paso bajo Nivel del Cerro Santa Lucía y el proyecto informático CIBERCYNC, constituyen el máximo momento de intercambios y transferencias creativas entre investigación científica, arte, diseño y arquitectura.</p>

            <p>Durante varias décadas los artistas permanecieron en el riguroso silencio de largas jornadas creativas en sus talleres, no siempre suficientemente comprendidos y valorados a nivel de público, instituciones y coleccionistas. Además, varios de ellos vivieron y trabajaron en provincia, situación que contribuyó a un cierto aislamiento pero que también les otorgó una identidad fuerte y personal.</p>

            <p>abstraccionsur.com es un portal que facilita el acercamiento y conocimiento de las obras y procesos materiales de los artistas desde su propia voz y en sus contextos de trabajo, compartiendo algunas claves de sus pensamientos creativos, que siguen teniendo la misma potencia y vigencia en nuestros días. </p>

            <p>El punto de partida de esta recuperación historiográfica y la difusión de los artistas de esta tendencia lo constituyó la exposición <a href="https://www.youtube.com/watch?v=fuUhYr64Pqw" target="_blank" rel="noopener noreferrer">La revolución de las formas: 60 años de arte abstracto en Chile</a> que se realizó el año 2017 en el Centro Cultural de la Moneda. Una galería de imágenes recuerda la museografía y la distribución de las obras en la exposición.</p>
          </section>

          <section class={css.team} id="team">
            <h2 class={css.title}>Micro-documentales Abstracción Sur</h2>

            <dl>
              <dt>Dirección</dt>
              <dd>Ramón Castillo</dd>

              <dt>Producción general</dt>
              <dd>Olivia Guasch</dd>

              <dt>Guión y armado</dt>
              <dd>Manuela Piña y Ramón Castillo</dd>

              <dt>Cámara</dt>
              <dd>Rodrigo Avilés y Juan Millán</dd>

              <dt>Edición y montaje</dt>
              <dd>Manuela Piña</dd>
              
              <dt>Asistentes de montaje</dt>
              <dd>Pablo Schroder y Emilia Rothen</dd>

              <dt>Sonido</dt>
              <dd>Carlos Arias</dd>

              <dt>Temas musicales</dt>
              <dd>Rodrigo "Chino" Aros</dd>

              <dt>Programación sitio web</dt>
              <dd>Osmán Cea</dd>

              <dt>Diseño y gráfica web</dt>
              <dd>Micchela Messone</dd>

              <dt>Edición de textos</dt>
              <dd>Catalina Mena</dd>
            </dl>
          </section>

          <section id="photography">
            <h2 class={css.title}>Fotografía de obras</h2>

            <ul class={css.list}>
              <li>Fernando Balmaceda</li>
              <li>Jorge Brantmayer</li>
              <li>Darío Tapia</li>
              <li>Patricia Novoa</li>
            </ul>

            <h3 class={css.subtitle}>Imágenes de archivo del documental “La revolución de las formas”:</h3>

            <ul class={css.list}>
              <li>Director - Productor: Andrés Mardones</li>
              <li>Productor: Ramón Castillo</li>
              <li>Productora asociada: Olivia Guasch</li>
              <li>Montaje: Martín Hernández</li>
              <li>Entrevista: Catalina Mena</li>
              <li>Cámara: Rodrigo Avilés</li>
            </ul>

            <h3 class={css.subtitle}>Otras imágenes de archivo provienen de:</h3>

            <ul class={css.list}>
              <li>Archivo Federico Assler</li>
              <li>Archivo Ramón Castillo</li>
              <li>Archivo Paz Olea</li>
              <li>Archivo Claudio Román</li>
              <li>Archivo Alejandro Siña</li>
              <li>Archivo Elsa Bolivar</li>
            </ul>
          </section>

          <section id="acknowledgement">
            <h2 class={css.title}>Agradecimientos</h2>

            <ul class={css.listCols}>
              <li>Paula Alvarado</li>
              <li>Jonus Bartholdson</li>
              <li>Gustavo Carrasco</li>
              <li>Catalina Carrasco</li>
              <li>Gabriel Carvajal</li>
              <li>Leonor Castañeda</li>
              <li>Carlos Cruz Puga</li>
              <li>Rita Hughes y David Hughes</li>
              <li>Francisca Délano</li>
              <li>Sebastián Dibs</li>
              <li>Hernán Eddigng</li>
              <li>Perro Montes</li>
              <li>Gustavo Poblete </li>
              <li>Josefina López</li>
              <li>Denise Rattinof</li>
              <li>Esteban “Rama” Oliva</li>
              <li>Enrique Rivera</li>
              <li>María José Riveros</li>
              <li>Gonzalo Sánchez</li>
              <li>Ramón Sauma</li>
              <li>María Smith-Rodríguez</li>
              <li>Enrique Stindt</li>
              <li>Carmen Valbuena</li>
            </ul>
            
            <ul class={css.list} style="margin-top: 64px;">
              <li>Centro Cultural La Moneda (CCPLM)</li>
              <li>Universidad Diego Portales (UDP)</li>
              <li>Instituto Nacional, Santiago de Chile</li>
              <li>Museo de Arte y Artesanías de Linares</li>
              <li>Universidad Católica de Temuco</li>
              <li>Universidad Católica de Valparaíso</li>
              <li>Museo Nacional de Bellas Artes, Santiago de Chile</li>
            </ul>
          </section>

          <section id="financedBy" style="margin-bottom: 80px;">
            <h2 class={css.title}>Proyecto financiado por</h2>

            <img
              class={css.fondart}
              src="assets/img/fondart.png"
              alt="Logo Fondart"
              title="Fondo Nacional para el Desarrollo Cultural y las Artes (FONDART, 2018)"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default About;
