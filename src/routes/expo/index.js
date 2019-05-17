import { h, Component } from 'preact';

import Header from '../../components/header';

import { getExpoGallery } from '../../model/expo';
import css from './style.css';

class Expo extends Component {
  state = {
    fetching: false,
    images: []
  };

  componentDidMount() {
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
    });
  }

  render(props, { images }) {
    return (
      <div>
        <Header onChangeLang={props.onChangeLang} />
        <div class={css.columns}>
          {images.map(column => (
            <div class={css.column}>
              {column.map(image => (
                <figure class={css.item}>
                  <img
                    src={image.url}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Expo;
