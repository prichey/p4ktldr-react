import React from 'react';
import styled from 'styled-components';
// import { Switch, Route, Redirect } from 'react-router-dom';

import Search from './Search';
// import Results from './Results';

const StyledMain = styled.main`
  margin-top: 5em;
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
`;

class Main extends React.Component {
  render() {
    return (
      <StyledMain>
        <Search />
        {/* <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/search/:band" component={Results} />
          <Route render={() => <Redirect to="/" />} />
        </Switch> */}
      </StyledMain>
    );
  }
}

export default Main;
