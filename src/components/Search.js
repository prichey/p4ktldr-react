import React from 'react';
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';
import fetch from 'node-fetch';

import { unescape } from 'lodash';

import Results from './Results';

const StyledSearchWrap = styled.section``;

const getSuggestions = value => {
  return fetch(`https://pitchfork.com/api/v2/search/_ac/?query=${value}`)
    .then(res => res.json())
    .then(json => {
      return json.artists;
    });
};

const getSuggestionValue = suggestion => unescape(suggestion.name);

const renderSuggestion = suggestion => <div>{unescape(suggestion.name)}</div>;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      redirect: false,
      selection: null
    };
  }

  onChange = (event, { newValue }) => {
    console.log('change');
    this.setState({
      value: newValue,
      selection: null
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ selection: null });

    getSuggestions(value)
      .then(suggestions => {
        this.setState({
          suggestions: suggestions
        });
      })
      .catch(e => {
        console.log(e);
        this.setStates({
          suggestions: []
        });
      });
  };

  onSuggestionsClearRequested = () => {
    console.log('clear');
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex }
  ) => {
    this.setState({
      redirect: true,
      selection: suggestion
    });
    console.log(suggestion, suggestionValue, suggestionIndex);
    // return <Redirect to="/search/wilco" />;
    // history.location({
    //   pathname: '/search/' + suggestionValue,
    //   state: { search: suggestionValue }
    // });
    return;
    // return null;
  };

  render() {
    const { value, suggestions, selection } = this.state;

    const inputProps = {
      placeholder: '',
      value: value,
      onChange: this.onChange
    };

    return (
      <StyledSearchWrap>
        <h1>p4ktldr</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        {selection && <Results selection={selection} />}
      </StyledSearchWrap>
    );
  }
}

export default Search;
