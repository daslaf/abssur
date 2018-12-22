import { h } from 'preact';
import style from './style';

import cat1 from '../../assets/img/cat1.png';
import cat2 from '../../assets/img/cat2.jpg';
import cat3 from '../../assets/img/cat3.jpg';
import cat4 from '../../assets/img/cat4.jpg';

import Gallery from '../../components/gallery';
import Artist from '../../components/artist';

const Home = () => (
  <div class={style.home}>
    <Gallery source={[
      { id: 1, img: cat1, name: 'Osmán Cea' },
      { id: 2, img: cat2, name: 'Micchela Messonne' },
      { id: 3, img: cat3, name: 'El Kitten' },
      { id: 4, img: cat4, name: 'Perico Palotote' }
    ]}
    >
      {({ data }) => (
        <Artist {...data} />
      )}
    </Gallery>
  </div>
);

export default Home;
