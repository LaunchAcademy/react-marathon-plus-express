import React from "react";
import Song from "./Song";

const SongCollection = props => {
  // to solve for Step11, checks if songNameID state is null
  // if yes, then set the highlight selection to the first in the list
  if (!props.songNameID) {
    props.setSongNameID(props.songs[0].id);
  }

  const highlightSong = e => {
    let targetID = Number(e.currentTarget.id);
    props.setSongNameID(targetID);
  };

  let mappedSongs = props.songs.map(song => {
    let selected;
    if (props.songNameID === song.id) {
      selected = "selected";
    }

    return (
      <Song
        key={song.id}
        id={song.id}
        songs={song.name}
        artist={song.artist}
        handleClick={highlightSong}
        classNamer={selected}
      />
    );
  });

  return (
    <div className="columns small-6 container">
      <h4>Songlist</h4>
      {mappedSongs}
    </div>
  );
};

export default SongCollection;
