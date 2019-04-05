import { h, Component } from 'preact';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './style.css';

import { getArtworksByArtist } from '../../model/artwork';
import { withLocale } from '../../utils/locale';
import Translations from '../../context/translations';

import Artwork from '../../components/artwork';
import Header from '../../components/header';

class ArtistPage extends Component {
  state = {
    activeArtwork: 0,
    artworks: [],
    fetchingArtworks: false
  };

  /* Network */

  getArtworks = (id) => {
    this.setState({
      fetchingArtworks: true
    });

    getArtworksByArtist(id).then((artworks) => {
      this.setState({ artworks });
    });
  };

  /* Handlers */

  handleArtworkClick = artist => (event) => {
    this.setState({ activeArtwork: artist });
  }

  handleArtworkKeydown = artist => (event) => {
    if (event.which === 13) {
      this.handleArtworkClick(artist)(event);
    }
  }

  /* Lifecycle */

  componentDidMount() {
    this.getArtworks();
  }

  render(
    { activeArtist, onChangeLang, pluck },
    { activeArtwork, artworks }
  ) {
    return (
      <span>
        <Header onChangeLang={onChangeLang} />
        <main class="container" style={{ paddingLeft: 16, paddingRight: 16 }}>
          {activeArtist
            ? (
              <span>
                <section>
                  <div class={css.video}>
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/fuUhYr64Pqw?controls=0&showInfo=0"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    />
                  </div>
                </section>

                <section class={css.gallery}>
                  <div class={css.galleryArtworks}>
                    {artworks.map((data, index) => (
                      <Artwork {...data}>
                        {({ thumbnail }) => (
                          <figure
                            class={`${css.galleryItem} ${activeArtwork === index ? css.galleryItemActive  : '' }`}
                            role="image"
                            tabIndex="0"
                            onClick={this.handleArtworkClick(index)}
                            onKeyDown={this.handleArtworkKeydown(index)}
                            style={{ backgroundImage: `url(${thumbnail.src})` }}
                          />
                        )}
                      </Artwork>
                    ))}
                  </div>
                  <h1 class={css.galleryArtistName}>
                    {pluck(activeArtist.name)} <strong>{pluck(activeArtist.surname)}</strong>
                  </h1>
                </section>

                <section class={css.artwork}>
                  <div class={css.artworkDisplay}>
                    {artworks.length
                      ? (
                        <span>
                          <Translations.Consumer>
                            {TOKENS => (
                              <Artwork {...artworks[activeArtwork]}>
                                {({ format, image, name, technique, year }) => (
                                  <div>
                                    <span>
                                      <img
                                        alt={image.alt}
                                        src={image.src}
                                      />
                                    </span>

                                    <dl class={css.artworkInfo}>
                                      <span>
                                        <dt>{TOKENS.ARTWORK_NAME}</dt>
                                        <dd>{name}</dd>
                                      </span>
                                      <span>
                                        <dt>{TOKENS.ARTWORK_YEAR}</dt>
                                        <dd>{year}</dd>
                                      </span>
                                      <span>
                                        <dt>{TOKENS.ARTWORK_FORMAT}</dt>
                                        <dd>{format}</dd>
                                      </span>
                                      <span>
                                        <dt>{TOKENS.ARTWORK_TECHNIQUE}</dt>
                                        <dd>{technique}</dd>
                                      </span>
                                    </dl>
                                  </div>
                                )}
                              </Artwork>
                            )}
                          </Translations.Consumer>
                        </span>
                      )
                      : (
                        <div class={css.artworkPlaceholder} />
                      )
                    }
                  </div>
                </section>

                {activeArtist && (
                  <section class={css.biography}>
                    {documentToReactComponents(pluck(activeArtist.biography))}
                  </section>
                )}
              </span>
            )
            : (
              <h1>Loading</h1>
            )
          }
        </main>
      </span>
    );
  }
}

export default withLocale(ArtistPage);
