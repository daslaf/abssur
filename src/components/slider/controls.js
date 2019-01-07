import { h } from 'preact';

const Controls = ({ children, ...rest }) => children[0](rest);

export default Controls;
