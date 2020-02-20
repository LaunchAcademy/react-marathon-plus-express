import React from "react";
import Playlist from "./Playlist";

const PlaylistCollection = props => {
  // selecting the ID for playlist for highlight upon selecting
  const playlistSelector = e => {
    let targetID = Number(e.currentTarget.id);
    props.setPlaylistID(targetID);
    // set to null so that the check for null to select first
    // song will default to the first in the playlist, for Step 11
    props.setSongNameID(null);
  };

  let mappedPlaylist = props.playlists.map(list => {
    let selected;
    if (props.playlistID === list.id) {
      selected = "selected";
    }

    return (
      <Playlist
        key={list.id}
        id={list.id}
        list={list.name}
        setPlaylistID={props.setPlaylistID}
        handleClick={playlistSelector}
        classNamer={selected}
      />
    );
  });

  return (
    <div className="columns small-6 container">
      <h4>Playlist</h4>
      {mappedPlaylist}
    </div>
  );
};

export default PlaylistCollection;
