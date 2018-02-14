import React from 'react';
import styled from 'styled-components';

const StyledAlbumList = styled.ul``;
const StyledListItem = styled.li``;

class AlbumList extends React.Component {
  render() {
    const albumItems = this.props.albums
      .sort((a, b) => b.rating - a.rating)
      .map(album => (
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
