/* eslint-disable react/display-name */
import { h } from 'preact';
import Locale from '../context/lang';

const EN_US = 'en-US';
const ES_CL = 'es-CL';

const pluck = locale => obj => obj[locale] || obj[ES_CL];

const withLocale = (WrappedComponent) => (props) => (
  <Locale.Consumer>
    {locale => (
      <WrappedComponent
        locale={locale}
        pluck={pluck(locale)}
        {...props}
      />
    )}
  </Locale.Consumer>
);

export {
  EN_US,
  ES_CL,
  pluck,
  withLocale
};
