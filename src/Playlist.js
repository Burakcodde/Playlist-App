import React from "react";
import Tracklist from "./Tracklist";
import "./Playlist.css";

const Playlist = ({
  playlistName,
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
  onAdd,
}) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={handleNameChange}
        placeholder="Çalma Listesi Adı"
      />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        Spotify'a Kaydet
      </button>
    </div>
  );
};

export default Playlist;
