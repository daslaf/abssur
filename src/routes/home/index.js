import { h } from 'preact';
import css from './style';

import Artists from '../../components/artists';

const Home = ({ artists }) => (
  <div class={css.main}>
    {artists.length
      ? <Artists artists={artists} />
      : <h1>Loading</h1>
    }
  </div>
);

export default Home;
