import { createContext } from 'preact-context';

export const EN_US = 'en-US';
export const ES_CL = 'es-CL';

const Locale = createContext(EN_US);

export default Locale;
