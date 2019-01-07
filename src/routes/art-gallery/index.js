import { h, Component } from 'preact';
import style from './style.css';

import Artwork from '../../components/artwork';
import Slider, { Controls, Wrapper } from '../../components/slider';
import { controls, controlsPrevious, controlsNext, slide } from '../../components/slider/style';

import { getArtworksByArtist } from '../../model/artwork';

class ArtGallery extends Component {
  state = {
    artworks: [],
    fetchingArtworks: false
  }

  getArtworks = () => {
    this.setState({
      fetchingArtworks: true
    });

    getArtworksByArtist().then((artworks) => {
      this.setState({ artworks });
    });
  }

  handleChange = args => console.log('handle change');

  componentDidMount() {
    this.getArtworks();
  }

  render(props, { artworks }) {
    return (
      <div class={style.main}>
        <Slider
          source={artworks}
          onChange={this.handleChange}
        >
          <Controls>
            {({ currentSlide, totalSlides, nextSlide, previousSlide }) => (
              <div class={controls}>
                <button
                  class={controlsPrevious}
                  onClick={previousSlide}
                  disabled={currentSlide === 0}
                >
                  <i class="material-icons">keyboard_arrow_left</i>
                </button>
                <button
                  class={controlsNext}
                  onClick={nextSlide}
                  disabled={currentSlide === totalSlides - 1 || totalSlides === 0}
                >
                  <i class="material-icons">keyboard_arrow_right</i>
                </button>
              </div>
            )}
          </Controls>
          <Wrapper>
            {({ data }) => (
              <div class={slide}>
                <Artwork
                  {...data}
                />
              </div>
            )}
          </Wrapper>
        </Slider>
      </div>
    );
  }
}

export default ArtGallery;
