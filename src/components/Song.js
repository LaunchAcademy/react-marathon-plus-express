import React from "react";

const Song = props => {
  return (
    <h6 id={props.id} onClick={props.handleClick} className={props.classNamer}>
      {props.songs} - {props.artist}
    </h6>
  );
};

export default Song;
