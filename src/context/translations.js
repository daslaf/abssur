import { createContext } from 'preact-context';
import TRANSLATIONS from '../translations';
import { ES_CL } from './lang';

const Translations = createContext(TRANSLATIONS[ES_CL]);

export default Translations;
