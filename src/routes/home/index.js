import { h } from 'preact';
import style from './style';

import data from '../../model/artists';

import Artists from '../../components/artists';

const Home = () => (
  <div class={style.home}>
    <Artists artists={data} />
  </div>
);

export default Home;
