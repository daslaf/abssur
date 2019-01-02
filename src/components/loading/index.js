import { h } from 'preact';
import styles from './style.css';

const Loading = ({ style }) => (
  <div class={styles.container} {...style}>
    <div class={styles.elem} />
    <div class={styles.elem} />
  </div>
);

export default Loading;
