import { h, Component } from 'preact';

import Header from '../../components/header';

import { getExpoGallery } from '../../model/expo';
import css from './style.css';
import Ligthbox from '../../components/lightbox';

class Expo extends Component {
  state = {
    fetching: false,
    images: [],
    showLightbox: false,
    activeImage: null
  };

  handleHideLightbox = () => {
    this.setState({
      activeImage: null,
      showLightbox: false
    });
  };

  handleShowLightbox = (image) => () => {
    this.setState({
      activeImage: image,
      showLightbox: true
    });
  };

  componentDidMount() {
    const { onPreload } = this.props;

    getExpoGallery().then((images) => {
      const items = Math.floor(images.length / 3);

      const columns = [
        images.slice(0, items),
        images.slice(items + 1, 2 * items + 1),
        images.slice(2 * (items + 1))
      ];

      this.setState({
        images: columns
      });

      onPreload();
    });
  }

  render(props, { activeImage, images, showLightbox }) {
    return (
      <div>
        <Header onChangeLang={props.onChangeLang} />

        <div class={css.columns}>
          {images.map(column => (
            <div class={css.column}>
              {column.map(image => (
                <figure
                  onClick={this.handleShowLightbox(image)}
                  class={css.item}
                >
                  <div class={css.imageWrapper}>
                    <img
                      src={image.url}
                    />
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>

        <Ligthbox
          in={showLightbox}
          onHide={this.handleHideLightbox}
          image={activeImage}
        />
      </div>
    );
  }
}

export default Expo;
