import { h, Component } from 'preact';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import css from './style.css';
import pointer from '../../assets/img/eye.png';

import { getArtworksByArtist } from '../../model/artwork';
import { withLocale } from '../../utils/locale';
import Translations from '../../context/translations';

import Artwork from '../../components/artwork';
import GalleryModal from '../../components/galleryModal';
import Header from '../../components/header';

class ArtistPage extends Component {
  state = {
    activeArtwork: 0,
    artworks: [],
    showCarousel: false
  };

  /* Network */

  getArtworks = (id) => {
    const { onPreload } = this.props;

    getArtworksByArtist(id).then((artworks) => {
      this.setState({
        artworks
      });

      onPreload();
    });
  };

  /* Handlers */

  handleActiveArtworkClick = () => {
    this.setState({ showCarousel: true });
  }

  handleArtworkClick = artist => () => {
    this.setState({ activeArtwork: artist });
  }

  handleArtworkKeydown = artist => (event) => {
    if (event.which === 13) {
      this.handleArtworkClick(artist)(event);
    }
  }

  handleHideModal = () => {
    this.setState({ showCarousel: false });
  }

  /* Lifecycle */

  componentDidMount() {
    const { id } = this.props;

    this.getArtworks(id);
  }

  renderArtworkDisplay = () => {
    const { activeArtwork, artworks } = this.state;

    return (
      <section class={css.artwork}>
        <div class={css.artworkDisplay}>
          {artworks.length
            ? (
              <Translations.Consumer>
                {TOKENS => (
                  <Artwork {...artworks[activeArtwork]}>
                    {({ format, image, name, technique, year }) => (
                      <div>
                        <img
                          onClick={this.handleActiveArtworkClick}
                          title={image.alt}
                          alt={image.alt}
                          src={image.src}
                          style={{ cursor: `url("${pointer}"), pointer` }}
                        />

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
            )
            : (
              <div class={css.artworkPlaceholder} />
            )
          }
        </div>
      </section>
    );
  }

  renderArtworksList = () => {
    const { activeArtist, pluck } = this.props;
    const { activeArtwork, artworks } = this.state;

    return (
      <section class={css.gallery}>
        <div class={css.galleryArtworks}>
          {artworks.map((data, index) => (
            <Artwork {...data}>
              {({ thumbnail }) => (
                <figure
                  class={`${css.galleryItem} ${activeArtwork === index ? css.galleryItemActive  : '' }`}
                  role="image"
                  tabIndex="0"
                  title={thumbnail.alt}
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
    );
  }

  render(props, state) {
    const { activeArtist, onChangeLang, pluck } = props;
    const { activeArtwork, artworks, showCarousel } = state;

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
                      src={pluck(activeArtist.videoUrl)}
                      frameborder="0"
                      allow="autoplay; fullscreen"
                      allowfullscreen
                    />
                  </div>
                </section>

                {/* Artworks List */}
                {this.renderArtworksList()}

                {/* Gallery Modal */}
                <GalleryModal
                  in={showCarousel}
                  onHide={this.handleHideModal}
                  activeArtwork={activeArtwork}
                  artworks={artworks}
                />
                
                {/* Active Artwork */}
                {this.renderArtworkDisplay()}

                {/* Biography */}
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
