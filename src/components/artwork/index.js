import { h } from 'preact';
import style from './style.css';

import { withLocale } from '../../utils/locale';

const Artwork = ({ format, image, name, pluck, technique, year }) => (
  <div class={style.artwork}>
    <h5>{pluck(name)}</h5>
    <img
      alt={pluck(pluck(image).fields.title)}
      src={pluck(pluck(image).fields.file).url}
    />
    <p>{pluck(technique)}</p>
    <p>{pluck(format)}</p>
    <p>{pluck(year)}</p>
  </div>
);

export default withLocale(Artwork);
