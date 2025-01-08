import React from "react";
import "./Track.css";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const handleClick = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  // Şarkı bilgilerini alalım
  const trackName = track.name || "Bilinmeyen Şarkı";
  const artistName = track.artists
    ? track.artists.map((artist) => artist.name).join(", ")
    : "Bilinmeyen Sanatçı";
  const albumName = track.album ? track.album.name : "Bilinmeyen Albüm";

  return (
    <div className="Track">
      <div className="Track-info">
        <h3>{trackName}</h3>
        <p>
          {artistName} | {albumName}
        </p>
      </div>
      <button className="Track-action" onClick={handleClick}>
        {isRemoval ? "-" : "+"}
      </button>
    </div>
  );
};

export default Track;
