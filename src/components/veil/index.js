import { h } from 'preact';
import style from './style';

const Veil = ({ show }) => (
  <div className={`${style.veil} ${show ? '' : style.hidden}`} />
);

export default Veil;