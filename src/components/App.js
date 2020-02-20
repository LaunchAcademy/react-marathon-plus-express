import React, { useState, useEffect } from "react";
import PlaylistCollection from "./PlaylistCollection";
import SongCollection from "./SongCollection";


const App = props => {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
//fetch the playlists data here
  },[])

  // getter and setter for function in the next playlist collection level
  const [playlistID, setPlaylistID] = useState(1);
  // getter and setter on top level so playlist can reset songNameID state
  // to null upon selection to fullfill Step11
  const [songNameID, setSongNameID] = useState(null);

  // using the playlistID upon when the playlist is selected,
  // filter out the particular playlist, then use map to just map the songs array
  // get back an array inside array so need to flatten
  let pickedSongListIDs = playlists
    .filter(list => list.id === playlistID)
    .map(ids => ids.songs)
    .flat();

  // now with the songs array of the selected playlist,
  // use it to filter via includes to just include the
  // list of songs in the selected playlist array
  let pickedSongList = props.data.songs.filter(song =>
    pickedSongListIDs.includes(song.id)
  );

  // feed the pickedSongList into the SongCollection prop (instead of the
  // typical props.data.songs) b/c we want the specific filtered list
  return (
    <div className="app row callout"> This is a Player
      <h2 className="title">React Music Player</h2>

    </div>
  );
};

export default App;
