import normalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';

export default () => {
  injectGlobal`
    ${normalize}

    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    }

    .react-autosuggest__container {}

    .react-autosuggest__container--open {}

    .react-autosuggest__input {
      width: 100%;
      padding: 0.5em;
    }

    .react-autosuggest__input--open {}

    .react-autosuggest__input--focused {}

    .react-autosuggest__suggestions-container {}

    .react-autosuggest__suggestions-container--open {}

    .react-autosuggest__suggestions-list {}

    .react-autosuggest__suggestion {}

    .react-autosuggest__suggestion--first {}

    .react-autosuggest__suggestion--highlighted {
      font-weight: bold;
    }

    .react-autosuggest__section-container {}

    .react-autosuggest__section-container--first {}

    .react-autosuggest__section-title {}
  `;
};
