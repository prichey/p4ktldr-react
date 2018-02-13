import React from 'react';
import baseStyles from './../utils/base-styles';

import { Helmet } from 'react-helmet';

import Main from './Main';

class App extends React.Component {
  render() {
    baseStyles();

    return (
      <div>
        <Helmet>
          <title>p4ktldr</title>
        </Helmet>

        <header />
        <Main />
        <footer />
      </div>
    );
  }
}

export default App;
