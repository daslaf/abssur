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
      <div className={css.artworkDisplay}>
        {artworks.length
          ? (
            <Translations.Consumer>
              {TOKENS => (
                <Artwork {...artworks[activeArtwork]}>
                  {({ collection, format, image, name, technique, year }) => (
                    <div>
                      <img
                        onClick={this.handleActiveArtworkClick}
                        title={image.alt}
                        alt={image.alt}
                        src={image.src}
                        style={{ cursor: `url("${pointer}"), pointer` }}
                      />

                      {/* <dl className={css.artworkInfo}>
                        {name && (
                          <span>
                            <dt>{TOKENS.ARTWORK_NAME}</dt>
                            <dd>{name}</dd>
                          </span>
                        )}
                        {year && (
                          <span>
                            <dt>{TOKENS.ARTWORK_YEAR}</dt>
                            <dd>{year}</dd>
                          </span>
                        )}
                        {format && (
                          <span>
                            <dt>{TOKENS.ARTWORK_FORMAT}</dt>
                            <dd>{format}</dd>
                          </span>
                        )}
                        {technique && (
                          <span>
                            <dt>{TOKENS.ARTWORK_TECHNIQUE}</dt>
                            <dd>{technique}</dd>
                          </span>
                        )}
                        {collection && (
                          <span>
                            <dt>{TOKENS.ARTWORK_COLLECTION}</dt>
                            <dd>{collection}</dd>
                          </span>
                        )}
                      </dl> */}
                    </div>
                  )}
                </Artwork>
              )}
            </Translations.Consumer>
          )
          : (
            <div className={css.artworkPlaceholder} />
          )
        }
      </div>
    );
  }

  renderArtworksList = () => {
    const { activeArtwork, artworks } = this.state;

    return (
      <div className={css.galleryArtworks}>
        {artworks.map((data, index) => (
          <Artwork {...data}>
            {({ thumbnail }) => (
              <figure
                className={`${css.galleryItem} ${activeArtwork === index ? css.galleryItemActive  : '' }`}
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
    );
  }

  render(props, state) {
    const {
      activeArtist,
      onChangeLang,
      pluck
    } = props;
    const { activeArtwork, artworks, showCarousel } = state;

    return activeArtist && (
      <div className={css.mainGrid}>
        <section className={css.header}>
          <Header onChangeLang={onChangeLang} />
        </section>
        <section className={css.artistName}>
          <h1 className={css.galleryArtistName}>
            {pluck(activeArtist.name)}{' '}<strong>{pluck(activeArtist.surname)}</strong>
          </h1>
        </section>
        <section className={css.artworkDisplaySection}>
          {this.renderArtworkDisplay()}
        </section>
        <section className={css.biography}>
          <div className={css.biographyContent}>
            {documentToReactComponents(pluck(activeArtist.biography))}
          </div>
          <div className={css.video}>
            <iframe
              src={pluck(activeArtist.videoUrl)}
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
            />
          </div>
        </section>
        <section className={css.gallery}>
          {this.renderArtworksList()}
        </section>

        <GalleryModal
          in={showCarousel}
          onHide={this.handleHideModal}
          activeArtwork={activeArtwork}
          artworks={artworks}
        />  
      </div>
    );
  }
}

export default withLocale(ArtistPage);
