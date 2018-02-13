import React from 'react';
import styled from 'styled-components';

const StyledAlbumList = styled.ul``;
const StyledListItem = styled.li``;

class AlbumList extends React.Component {
  render() {
    const albums = [];
    this.props.albums.map(album => {
      return album.tombstone.albums.map(each => {
        return albums.push({
          id: each.id,
          rating: Number(each.rating.display_rating),
          url: album.url,
          name: each.album.display_name
        });
      });
    });

    const albumItems = albums.sort((a, b) => b.rating - a.rating).map(album => (
      <StyledListItem key={album.id} rating={album.rating}>
        <a href={'https://pitchfork.com' + album.url} target="_blank">
          {album.name}
        </a>{' '}
        (<span>{album.rating}</span>)
      </StyledListItem>
    ));

    return <StyledAlbumList>{albumItems}</StyledAlbumList>;
  }
}

export default AlbumList;
