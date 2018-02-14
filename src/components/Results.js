import React from 'react';
import styled from 'styled-components';

import { filter, unescape } from 'lodash';

import AlbumList from './AlbumList';

const StyledResultsWrap = styled.section``;

const getAlbumsByArtistFromSearch = (allAlbums, searchArtist) => {
  const albums = [];

  // some album review objects are comprised of multiple individual albums
  allAlbums.map(possibleMultiReviews => {
    // console.log(possibleMultiReviews);
    possibleMultiReviews.tombstone.albums.map(review => {
      // console.log(review);
      if (
        filter(review.album.artists, albumArtist => {
          // console.log(albumArtist.id, searchArtist.id);
          return albumArtist.id === searchArtist.id;
        }).length > 0
      ) {
        const rating = Number(review.rating.display_rating);
        albums.push({
          id: review.id,
          rating: rating === 10 ? rating : rating.toFixed(1),
          url: possibleMultiReviews.url,
          name: review.album.display_name
        });
      }
      return true;
    });
    return true;
  });

  console.log(albums);
  return albums;
};

const getAlbumsByArtist = artist => {
  const url = `https://pitchfork.com/api/v2/search/more/?query=${escape(
    artist.name
  )}&filter=albumreviews&size=100&start=0`;
  console.log(url);
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      return getAlbumsByArtistFromSearch(json.results.list, artist);
    });
};

class Results extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      albums: [],
      selection: props.selection,
      loading: false
    };
  }

  componentDidMount() {
    console.log('mount');
    if (this.state.selection) {
      this.setState({ loading: true });
      getAlbumsByArtist(this.state.selection)
        // .then(albums => console.log)
        .then(albums => this.setState({ albums: albums, loading: false }))
        .catch(e => {
          console.log(e);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
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
          <h1>{unescape(this.state.selection.name)}</h1>
          {this.state.albums.length > 0 ? (
            <AlbumList albums={this.state.albums} />
          ) : (
            <h3>{this.state.loading ? 'Loading...' : 'No reviews.'}</h3>
          )}
        </StyledResultsWrap>
      );
    } else {
      return null;
    }
  }
}

export default Results;
