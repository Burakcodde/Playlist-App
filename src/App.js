import React, { useState, useCallback } from "react";
import "./App.css";

import Playlist from "./Playlist";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Spotify from "./Spotify";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState(0);

  const login = useCallback(() => {
    if (loginStep === 0) {
      Spotify.getAccessToken();
      setLoginStep(1);
    } else {
      setIsLoggedIn(true);
    }
  }, [loginStep]);

  const search = useCallback((term) => {
    if (!isLoggedIn) {
      alert("Lütfen önce giriş yapın.");
      return;
    }
    Spotify.search(term).then(setSearchResults);
  }, [isLoggedIn]);

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistTracks([]);
      setPlaylistName("New Playlist");
      alert(`Playlist "${playlistName}" kaydedildi!`);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>
        <span className="highlight">Playlist App</span>
      </h1>
      <div className="App">
        <div className="login-container">
          {!isLoggedIn && (
            <button onClick={login} className="login-button">
              {loginStep === 0 ? "Giriş" : "Devam"}
            </button>
          )}
        </div>
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={setPlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;