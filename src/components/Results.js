import React from 'react';
import styled from 'styled-components';

import AlbumList from './AlbumList';

const StyledResultsWrap = styled.section``;

const getAlbumsByArtist = artist => {
  return fetch(
    `https://pitchfork.com/api/v2/search/more/?query=${artist}&filter=albumreviews&size=100&start=0`
  )
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      return json.results.list;
    });
};

// const getAlbumsByArtistID = id => {
//   return fetch(
//     `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/`
//   )
//     .then(res => res.json())
//     .then(json => {
//       console.log(json);
//       if (json.count > 0) {
//         return json.results.list;
//       } else {
//         return null;
//       }
//     });
// };

class Results extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      albums: [],
      selection: props.selection
    };
  }

  componentDidMount() {
    console.log('mount');
    if (this.state.selection.name) {
      getAlbumsByArtist(this.state.selection.name)
        // .then(albums => console.log)
        .then(albums => this.setState({ albums: albums }))
        .catch(e => {
          console.log(e);
          // this.setState({ albums: null });
        });
    } else {
      return;
    }
    return;
    // if (this.state.selection.id) {
    //   getAlbumsByArtistID(this.state.selection.id)
    //     // .then(albums => console.log)
    //     .then(albums => this.setState({ albums: albums }))
    //     .catch(e => {
    //       console.log(e);
    //       // this.setState({ albums: null });
    //     });
    // } else {
    //   return;
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('did update');
    // if (this.state.selection.id) {
    //   getAlbumsByArtistID(this.state.selection.id)
    //     .then(albums => console.log)
    //     // .then(albums => this.setState({ albums: albums }))
    //     .catch(e => {
    //       console.log(e);
    //       // this.setState({ albums: null });
    //     });
    // } else {
    //   return;
    // }
  }

  render() {
    if (this.state.selection) {
      return (
        <StyledResultsWrap>
          <h1>{this.state.selection.name}</h1>
          {this.state.albums.length > 0 ? (
            <AlbumList albums={this.state.albums} />
          ) : (
            <h3>No albums</h3>
          )}
        </StyledResultsWrap>
      );
    } else {
      return null;
    }
  }
}

export default Results;
