import React from "react";

const Playlist = props => {
  return (
    <h6 onClick={props.handleClick}
        className={props.classNamer}
          id={props.id}>
      {props.list}
    </h6>
  );
};

export default Playlist;
